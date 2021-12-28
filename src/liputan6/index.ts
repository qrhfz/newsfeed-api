import axios, { AxiosResponse } from "axios";

import { JSDOM, VirtualConsole } from "jsdom";
import { Article } from "../entities/article";
const virtualConsole = new VirtualConsole();
const { getMetadata } = require('page-metadata-parser');


const frontPage: string = 'https://www.liputan6.com/'
const headers = { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0' }

export async function getLiputan6FrontPage(): Promise<string> {
    try {
        const { data } = await axios.get(frontPage, {
            headers: headers
        });
        return JSON.stringify(data);
    } catch (error) {
        return JSON.stringify(error);
    }

}

export function searchNewsLinks(html: string): string[] {
    const dom = new JSDOM(html);
    const links = dom.window.document.querySelectorAll("a");
    const newsUrls: string[] = []
    links.forEach(a => {
        const url = a.href.valueOf();
        const match = /https:\/\/www\.liputan6\.com\/.*\/read\/.*/.test(url)
        if (match) {
            newsUrls.push(a.href.valueOf());
        }
    })
    return newsUrls;

}

export async function extractMetadata(url: string): Promise<Article | undefined> {
    try {
        const { data } = await axios.get(url, { headers: headers });
        const html = JSON.stringify(data);
        const dom = new JSDOM(html,{virtualConsole});
        const doc = dom.window.document;
        const {title, image, description} = getMetadata(doc, url);
        return new Article(title, url, undefined, description, image);
    } catch (error) {
        return;
    }


}