import { Article } from "../../entities/article";
import { convertToSeconds, sortArticle } from "../../common/sort-articles";

const articles = [
    new Article("article 1", "google.com",new Date(1998, 18, 11)),
    new Article("article 2", "facebook.com",new Date(2012, 12, 21)),
]

it('artikel 2 muncul lebih dulu karena lebih baru',()=>{
    const sortedArticles = sortArticle(articles);
    expect(sortedArticles[0].title).toBe('article 2');
})

it('diberikan date mengembalikan angka',()=>{
   const sec = convertToSeconds(articles[0].isoDate);
   expect(sec>0).toBe(true);
})

