export class Article{
    constructor(
        title?:string, 
        link?:string, 
        isoDate?:Date, 
        content?:string,
        imageUrl?:string){
        this.title = title?? null;
        this.link = link?? null;
        this.isoDate = isoDate ?? null;
        this.snippet = content ?? null;
        this.imageUrl = imageUrl ?? null;
    }
    title: string|null;
    link: string|null;
    isoDate: Date|null;
    snippet: string|null;
    imageUrl: string|null;
}