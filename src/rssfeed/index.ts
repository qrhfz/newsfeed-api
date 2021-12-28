import { Router, Request, Response } from 'express'
import { Article } from '../entities/article';
import { readFeedCache } from './articles-cache';
import { getFeeds } from './get-feeds';
import { sortArticle } from './sort-articles';

const router = Router();

router.get('/', async (req, res)=>{
    const data: Article[] = await readFeedCache();
    
    res.json(sortArticle(data));
})

export {
    router as rssFeed
};