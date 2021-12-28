export class Article{
    constructor(
        title:string|undefined, 
        link:string|undefined, 
        isoDate:Date|undefined, 
        content:string|undefined,
        imageUrl:string|undefined){
        this.title = title?? null;
        this.link = link?? null;
        this.isoDate = isoDate ?? null;
        this.content = content ?? null;
        this.imageUrl = imageUrl ?? null;
    }
    title: string|null;
    link: string|null;
    isoDate: Date|null;
    content: string|null;
    imageUrl: string|null;
}