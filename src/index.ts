import express, { Application, Request, Response } from 'express' 
import { rssFeed } from './rssfeed';

const app : Application = express();
const port : number = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/rssfeed', rssFeed);

app.get('/', (req: Request, res: Response,)=>{
    res.send('hello');
});

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}
