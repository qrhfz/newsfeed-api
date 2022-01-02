import Parser from "rss-parser";
import { Article } from "../entities/article";

const parser = new Parser();


export async function parseRssFeed(url:string){
    const feed = await parser.parseURL(url);
    let articles: Article[] = []

    feed.items.forEach(item=>{
        const {title, link, isoDate, contentSnippet, enclosure} = item;
        let imageUrl = enclosure?.url;
        const article: Article = 
        {   
            title, 
            url: link,
            isoDate: new Date(isoDate??''),
            snippet:contentSnippet,
            image: imageUrl
        };
        articles.push(article);
    })
    return articles;
}