import { Article } from "../../src/entities/article";
import { getCnnFeed } from "../../src/rssfeed/get-cnn-feed"

it("return list of articles",async ()=>{
    const data = await getCnnFeed();
    expect(data[0]).toBeInstanceOf(Article);
})