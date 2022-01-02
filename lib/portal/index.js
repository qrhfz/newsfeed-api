"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rssFeed = void 0;
const express_1 = require("express");
const articles_cache_1 = require("./articles-cache");
const router = (0, express_1.Router)();
exports.rssFeed = router;
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let page = 1;
    let size = 50;
    if (req.query.page) {
        page = parseInt(req.query.page);
    }
    if (req.query.size) {
        size = parseInt(req.query.size);
    }
    const data = yield (0, articles_cache_1.readFeedCache)();
    const firstIndex = size * (page - 1);
    const lastIndex = firstIndex + size;
    const sliced = data.slice(firstIndex, lastIndex);
    res.json(sliced);
}));
