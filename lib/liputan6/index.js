"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Liputan6 = void 0;
const cheerio = __importStar(require("cheerio"));
const fetch_html_page_1 = require("../common/fetch-html-page");
const extract_metadata_1 = require("../common/extract-metadata");
class Liputan6 {
    constructor() {
        this.frontPage = 'https://www.liputan6.com/';
    }
    fetchFrontPage() {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield (0, fetch_html_page_1.fetchHtmlPage)(this.frontPage);
            if (html) {
                return html;
            }
            else {
                return '';
            }
        });
    }
    searchNewsUrls(html) {
        const $ = cheerio.load(html);
        const urls = [];
        $('a').each((_, value) => {
            var _a;
            const url = (_a = $(value).attr('href')) === null || _a === void 0 ? void 0 : _a.valueOf();
            if (!url)
                return;
            const test = /https:\/\/www\.liputan6\.com\/.*\/read\/.*/.test(url);
            if (test) {
                urls.push(url);
            }
        });
        const uniqueUrls = urls.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        return uniqueUrls;
    }
    call() {
        return __awaiter(this, void 0, void 0, function* () {
            const fpHtml = yield this.fetchFrontPage();
            if (fpHtml === null)
                return [];
            const newsUrls = this.searchNewsUrls(fpHtml);
            const articles = yield Promise.all(newsUrls.map((url) => __awaiter(this, void 0, void 0, function* () {
                const newsHtml = yield (0, fetch_html_page_1.fetchHtmlPage)(url);
                if (!newsHtml)
                    return null;
                const article = (0, extract_metadata_1.extractMetadata)(newsHtml);
                return article;
            })));
            const filteredArticle = articles.filter((val) => !!val);
            return filteredArticle;
        });
    }
}
exports.Liputan6 = Liputan6;
