import Parser from "rss-parser";
import { Article } from "../entities/article";

const parser = new Parser();


export async function parseRssFeed(url:string){
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