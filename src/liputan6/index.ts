import axios, { AxiosResponse } from "axios";

import { JSDOM, VirtualConsole } from "jsdom";
import { Article } from "../entities/article";
import * as cheerio  from "cheerio"

const virtualConsole = new VirtualConsole();
const { getMetadata } = require('page-metadata-parser');


const frontPage: string = 'https://www.liputan6.com/'
const headers = { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0' }

export async function fetchHtmlPage(url: string): Promise<string|null>{
    try {
        const { data } = await axios.get(url, {
            headers: headers
        });
        return JSON.stringify(data);
    } catch (_) {
        return null;
    }
}

export async function getLiputan6FrontPage(): Promise<string> {
    const html = await fetchHtmlPage(frontPage)
    if(html){
        return html;
    }else{
        return '';
    }
}

export function searchNewsLinks(html: string): string[] {
    // /https:\/\/www\.liputan6\.com\/.*\/read\/.*/.test(url)
    const $ = cheerio.load(html)
    const links: string[] = []
    $('a').each((index, value)=>{
        const url = $(value).attr('href')
        if(!url) return;

        const test = /https:\/\/www\.liputan6\.com\/.*\/read\/.*/.test(url)
        if(test){
            links.push(url)
        }
    })
    return links;

}

export function extractMetadata(html: string): Article | undefined{
    const $ = cheerio.load(html);
    const url = $('meta[property="og:url"]').attr('content');
    const title = $('meta[property="og:title"]').attr('content');
    const description = $('meta[property="og:description"]').attr('content');
    const image = $('meta[property="og:image"]').attr('content');
    const dateString = $('meta[property="article:published_time"]').attr('content');
    const date: Date|undefined = (dateString)?new Date(dateString):undefined
    return new Article(title,url,date,description,image)
}