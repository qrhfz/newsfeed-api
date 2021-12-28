import { Article } from "../entities/article";
import { getRssFeed } from "./get-rss-feed";

export const getCnnFeed: () => Promise<Article[]> = async () => {
    const url = "https://www.cnnindonesia.com/nasional/rss";
    return await getRssFeed(url);
}