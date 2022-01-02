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
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMetadata = void 0;
const cheerio = __importStar(require("cheerio"));
function extractMetadata(html) {
    const $ = cheerio.load(html);
    const link = $('meta[property="og:url"]').attr('content');
    const title = $('meta[property="og:title"]').attr('content');
    const snippet = $('meta[property="og:description"]').attr('content');
    const imageUrl = $('meta[property="og:image"]').attr('content');
    const dateString = $('meta[property="article:published_time"]').attr('content');
    const isoDate = (dateString) ? new Date(dateString) : undefined;
    return { title, url: link, isoDate, snippet, image: imageUrl };
}
exports.extractMetadata = extractMetadata;
