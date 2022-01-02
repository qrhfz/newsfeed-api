import express, { Application, Request, Response } from 'express' 
import { rssFeed } from './portal';
import { readFeedCache } from './portal/articles-cache';

const app : Application = express();
const port : number = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/news', rssFeed);

app.get('/', (_: Request, res: Response,)=>{
    res.send('hello');
});

try {
    app.listen(port, async () => {
        await readFeedCache();
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}
