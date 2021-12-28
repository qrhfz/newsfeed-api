import Parser from "rss-parser";
import { Article } from "../entities/article";


const parser = new Parser();
const url = "https://www.cnnindonesia.com/nasional/rss";

export const getCnnFeed:()=>Promise<Article[]> = async ()=>{
    const feed = await parser.parseURL(url);
    let articles: Article[] = []

    feed.items.forEach(item=>{
        const {title, link, isoDate, contentSnippet, enclosure} = item;
        let imageUrl = enclosure?.url;
        const article: Article = new Article(title, link, new Date(isoDate??''),contentSnippet, imageUrl);
        articles.push(article);
    })
    return articles;
}