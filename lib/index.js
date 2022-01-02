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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const portal_1 = require("./portal");
const articles_cache_1 = require("./portal/articles-cache");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/news', portal_1.rssFeed);
app.get('/', (req, res) => {
    res.send('hello');
});
try {
    app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, articles_cache_1.readFeedCache)();
        console.log(`Connected successfully on port ${port}`);
    }));
}
catch (error) {
    console.error(`Error occured: ${error.message}`);
}
