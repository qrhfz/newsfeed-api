import * as cheerio  from "cheerio"
import { Article } from "../entities/article";

export function extractMetadata(html: string): Article{
    const $ = cheerio.load(html);
    const link = $('meta[property="og:url"]').attr('content');
    const title = $('meta[property="og:title"]').attr('content');
    const snippet = $('meta[property="og:description"]').attr('content');
    const imageUrl = $('meta[property="og:image"]').attr('content');
    const dateString = $('meta[property="article:published_time"]').attr('content');
    const isoDate: Date|undefined = (dateString)?new Date(dateString):undefined
    return {title,url: link,isoDate,snippet,image: imageUrl}
}