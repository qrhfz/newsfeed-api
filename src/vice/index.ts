import { Article } from "../entities/article";
import { parseRssFeed } from "../common/parse-rss-feed";

const call: () => Promise<Article[]> = async () => {
    const url = "https://www.vice.com/id/rss?locale=id_id";
    return await parseRssFeed(url);
}

export default call