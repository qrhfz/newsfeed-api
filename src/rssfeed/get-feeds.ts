import { Request, Response } from "express";
import Parser from 'rss-parser'
import { Article } from "../entities/article";
import { getAntaraFeed } from "./get-antara-feed";
import { getCnnFeed } from "./get-cnn-feed";
import * as Liputan6 from "../liputan6"

const parser = new Parser();

export const getFeeds = async () => {
    console.log('getFeeds')
    const feeds = [
        getCnnFeed(),
        getAntaraFeed(),
        Liputan6.call()
    ]

    let x = await Promise.all<Article[]>(feeds);

    return x.flat();
}