import { Article } from "../entities/article";
import Antara from "../antara";
import CNN from "../cnn";
import {Liputan6} from "../liputan6"
import Republika from "../republika"

export const getAllFeeds = async () => {
    console.log('getFeeds')
    const feeds = [
        CNN(),
        Antara(),
        new Liputan6().call(),
        Republika()
    ]

    const articles = await Promise.all<Article[]>(feeds);
    const flattenArticles = articles.flat();
    return flattenArticles;
}