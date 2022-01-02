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
exports.readFeedCache = void 0;
const sort_articles_1 = require("../common/sort-articles");
const get_all_feeds_1 = require("./get-all-feeds");
let cache;
function readFeedCache() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!cache) {
            const data = yield (0, get_all_feeds_1.getAllFeeds)();
            cache = {
                createdAt: Date.now(),
                articles: data
            };
        }
        else {
            const diff = Date.now() - cache.createdAt;
            const minutesDiff = Math.floor(diff / 1000 / 60);
            if (minutesDiff > 14) {
                const data = yield (0, get_all_feeds_1.getAllFeeds)();
                cache = {
                    createdAt: Date.now(),
                    articles: data
                };
            }
        }
        return (0, sort_articles_1.sortArticle)(cache.articles);
    });
}
exports.readFeedCache = readFeedCache;
