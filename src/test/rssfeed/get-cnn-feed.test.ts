import { Article } from "../../entities/article";
import { getCnnFeed } from "../../cnn/get-cnn-feed"

it("return list of articles",async ()=>{
    const data = await getCnnFeed();
    expect(data[0]).toBeInstanceOf(Article);
})