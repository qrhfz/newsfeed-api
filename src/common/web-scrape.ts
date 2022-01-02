import { Article } from "../entities/article"

export interface WebScrape{
    fetchFrontPage(): Promise<string|null>
    searchNewsUrls(html: string):string[]
    call(): Promise<Article[]>
}