import { Request, Response } from "express";
import Parser from 'rss-parser'
import { Article } from "../entities/article";
import { getAntaraFeed } from "./get-antara-feed";
import { getCnnFeed } from "./get-cnn-feed";

const parser = new Parser();

export const getFeeds = async (req: Request, res: Response) => {
    const feeds = [
        getCnnFeed(),
        getAntaraFeed(),
    ]

    let x = await Promise.all<Article[]>(feeds);

    res.json(x.flat());
}