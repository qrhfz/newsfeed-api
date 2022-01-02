import { Article } from "../entities/article";
import { parseRssFeed } from "../common/parse-rss-feed";

const call: () => Promise<Article[]> = async () => {
    const url = "https://www.antaranews.com/rss/terkini.xml";
    return await parseRssFeed(url);
}

export default call

