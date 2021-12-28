import { Article } from "../entities/article";
import { getFeeds } from "./get-feeds";

interface ArticleCache{
    createdAt: number,
    articles: Article[]
}

let cache: ArticleCache|undefined;

export async function readFeedCache(): Promise<Article[]> {
    if(!cache){
        const data: Article[] = await getFeeds();
        cache = {
            createdAt: Date.now(),
            articles: data
        }
    }else{
        const diff = Date.now()-cache.createdAt;
        const minutesDiff= Math.floor(diff/1000/60);

        if(minutesDiff>14){
            const data: Article[] = await getFeeds();
            cache = {
                createdAt: Date.now(),
                articles: data
            }
        }
    }
    return cache.articles;
}