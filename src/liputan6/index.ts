import axios from "axios";
import { Article } from "../entities/article";
import * as cheerio  from "cheerio"



const frontPage: string = 'https://www.liputan6.com/'
const headers = { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0' }

export async function fetchHtmlPage(url: string): Promise<string|null>{
    try {
        const { data } = await axios.get(url, {
            headers: headers
        });
        return data
    } catch (e) {
        console.error(e)
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

export function searchNewsUrls(html: string): string[] {
    const $ = cheerio.load(html)
    const urls: string[] = []
    $('a').each((index, value)=>{
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

export function extractMetadata(html: string): Article{
    const $ = cheerio.load(html);
    const url = $('meta[property="og:url"]').attr('content');
    const title = $('meta[property="og:title"]').attr('content');
    const description = $('meta[property="og:description"]').attr('content');
    const image = $('meta[property="og:image"]').attr('content');
    const dateString = $('meta[property="article:published_time"]').attr('content');
    const date: Date|undefined = (dateString)?new Date(dateString):undefined
    return new Article(title,url,date,description,image)
}

export async function callLiputan6(
    callFrontPage: ()=>Promise<string>,
    fetchHtmlPage : (url: string)=> Promise<string | null>
    ): Promise<Article[]>{
    const fpHtml = await callFrontPage()
    const newsUrls = searchNewsUrls(fpHtml)
    

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

export const call = async ()=>{
    return await callLiputan6(getLiputan6FrontPage,fetchHtmlPage)
}