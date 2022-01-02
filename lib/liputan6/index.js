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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callLiputan6 = exports.extractMetadata = exports.searchNewsUrls = exports.getLiputan6FrontPage = exports.fetchHtmlPage = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const frontPage = 'https://www.liputan6.com/';
const headers = { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0' };
function fetchHtmlPage(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get(url, {
                headers: headers
            });
            return data;
        }
        catch (e) {
            console.error(e);
            return null;
        }
    });
}
exports.fetchHtmlPage = fetchHtmlPage;
function getLiputan6FrontPage() {
    return __awaiter(this, void 0, void 0, function* () {
        const html = yield fetchHtmlPage(frontPage);
        if (html) {
            return html;
        }
        else {
            return '';
        }
    });
}
exports.getLiputan6FrontPage = getLiputan6FrontPage;
function searchNewsUrls(html) {
    const $ = cheerio.load(html);
    const urls = [];
    $('a').each((index, value) => {
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
exports.searchNewsUrls = searchNewsUrls;
function extractMetadata(html) {
    const $ = cheerio.load(html);
    const link = $('meta[property="og:url"]').attr('content');
    const title = $('meta[property="og:title"]').attr('content');
    const snippet = $('meta[property="og:description"]').attr('content');
    const imageUrl = $('meta[property="og:image"]').attr('content');
    const dateString = $('meta[property="article:published_time"]').attr('content');
    const isoDate = (dateString) ? new Date(dateString) : undefined;
    return { title, link, isoDate, snippet, image: imageUrl };
}
exports.extractMetadata = extractMetadata;
function callLiputan6(callFrontPage, fetchHtmlPage) {
    return __awaiter(this, void 0, void 0, function* () {
        const fpHtml = yield callFrontPage();
        const newsUrls = searchNewsUrls(fpHtml);
        const articles = yield Promise.all(newsUrls.map((url) => __awaiter(this, void 0, void 0, function* () {
            const newsHtml = yield fetchHtmlPage(url);
            if (!newsHtml)
                return null;
            const article = extractMetadata(newsHtml);
            return article;
        })));
        const filteredArticle = articles.filter((val) => !!val);
        return filteredArticle;
    });
}
exports.callLiputan6 = callLiputan6;
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield callLiputan6(getLiputan6FrontPage, fetchHtmlPage);
});
