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
exports.getAllFeeds = void 0;
const antara_1 = __importDefault(require("../antara"));
const cnn_1 = __importDefault(require("../cnn"));
const liputan6_1 = __importDefault(require("../liputan6"));
const republika_1 = __importDefault(require("../republika"));
const getAllFeeds = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('getFeeds');
    const feeds = [
        (0, cnn_1.default)(),
        (0, antara_1.default)(),
        (0, liputan6_1.default)(),
        (0, republika_1.default)()
    ];
    const articles = yield Promise.all(feeds);
    const flattenArticles = articles.flat();
    return flattenArticles;
});
exports.getAllFeeds = getAllFeeds;
