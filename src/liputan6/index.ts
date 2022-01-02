import { Article } from "../entities/article";
import * as cheerio  from "cheerio"
import { fetchHtmlPage } from "../common/fetch-html-page";
import {WebScrape} from "./../common/web-scrape";
import { extractMetadata } from "../common/extract-metadata";

export class Liputan6 implements WebScrape{
    
    frontPage: string = 'https://www.liputan6.com/'

    async fetchFrontPage(): Promise<string | null> {
        const html = await fetchHtmlPage(this.frontPage)
        if(html){
            return html;
        }else{
            return '';
        }
    }
    searchNewsUrls(html: string): string[] {
        const $ = cheerio.load(html)
        const urls: string[] = []
        $('a').each((_, value)=>{
            const url = $(value).attr('href')?.valueOf()
            if(!url) return;

            const test = /https:\/\/www\.liputan6\.com\/.*\/read\/.*/.test(url)
            if(test){
                urls.push(url)
            }
        })
        const uniqueUrls = urls.filter((value, index, self) =>{
            return self.indexOf(value) === index;
        })
        return uniqueUrls;
    }
    async call(): Promise<Article[]> {
        const fpHtml = await this.fetchFrontPage()
        if(fpHtml===null) return []

        const newsUrls = this.searchNewsUrls(fpHtml)
        

        const articles = await Promise.all(
            newsUrls.map(async url=>{
                const newsHtml = await fetchHtmlPage(url)
                if(!newsHtml) return null
                const article = extractMetadata(newsHtml)
                return article
            })
        )

        const filteredArticle = articles.filter((val):val is Article=>!!val)
        return filteredArticle
    }

}