import { Article } from "../entities/article";

export function convertToSeconds(date: Date|null): number {
    return (date)?date.getTime()/1000:0;
}

export function sortArticle( articles: Article[]): Article[] {
    const sortedArticles = articles.sort(function (a,b):number{
        let dateA:number = convertToSeconds(a.isoDate)
        let dateB:number = convertToSeconds(b.isoDate)
        return  (dateA - dateB)*-1;
    })

    return sortedArticles;
}
  
