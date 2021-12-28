import { Article } from "../entities/article";
import { getRssFeed } from "./get-rss-feed";

export const getAntaraFeed: () => Promise<Article[]> = async () => {
    const url = "https://www.antaranews.com/rss/terkini.xml";
    return await getRssFeed(url);
}