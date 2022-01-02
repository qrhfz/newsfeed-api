import { Article } from "../entities/article";
import { parseRssFeed } from "../common/parse-rss-feed";

const call: () => Promise<Article[]> = async () => {
    const url = "https://lapi.kumparan.com/v2.0/rss/";
    return await parseRssFeed(url);
}

export default call