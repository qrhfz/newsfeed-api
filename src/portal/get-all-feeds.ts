import { Article } from "../entities/article";
import Antara from "../antara/get-antara-feed";
import CNN from "../cnn/get-cnn-feed";
import Liputan6 from "../liputan6"

export const getAllFeeds = async () => {
    console.log('getFeeds')
    const feeds = [
        CNN(),
        Antara(),
        Liputan6()
    ]

    const articles = await Promise.all<Article[]>(feeds);
    const flattenArticles = articles.flat();
    return flattenArticles;
}