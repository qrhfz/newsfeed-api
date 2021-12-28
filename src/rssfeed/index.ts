import { Router, Request, Response } from 'express'
import { getFeeds } from './get-feeds';

const router = Router();

router.get('/', getFeeds)

export {
    router as rssFeed
};