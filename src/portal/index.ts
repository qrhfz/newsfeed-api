import { Request, Response, Router} from 'express'
import { Article } from '../entities/article';
import { readFeedCache } from './articles-cache';
import { sortArticle } from '../common/sort-articles';

const router = Router();

router.get('/', async (req:Request, res:Response)=>{
    let page = 1
    let size = 50
    if(req.query.page){
        page = parseInt((req.query.page as string))
    }

    if(req.query.size){
        size = parseInt((req.query.size as string))
    }
    
    const data: Article[] = await readFeedCache();
    const firstIndex = size*(page-1)
    const lastIndex = firstIndex+size
    const sliced = data.slice(firstIndex, lastIndex)
    res.json(sliced);
})

export {
    router as rssFeed
};