"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArticle = exports.convertToSeconds = void 0;
function convertToSeconds(date) {
    return (date) ? date.getTime() / 1000 : 0;
}
exports.convertToSeconds = convertToSeconds;
function sortArticle(articles) {
    const sortedArticles = articles.sort(function (a, b) {
        let dateA = convertToSeconds(a.isoDate);
        let dateB = convertToSeconds(b.isoDate);
        return (dateA - dateB) * -1;
    });
    return sortedArticles;
}
exports.sortArticle = sortArticle;
