import { Router, Request, Response } from 'express'
import { Article } from '../entities/article';
import { getFeeds } from './get-feeds';
import { sortArticle } from './sort-articles';

const router = Router();

router.get('/', async (req, res)=>{
    const data: Article[] = await getFeeds();
    
    res.json(sortArticle(data));
})

export {
    router as rssFeed
};