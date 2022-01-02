import { Article } from "../../entities/article";
import CNN from "../../cnn"

it("return list of articles",async ()=>{
    const data = await CNN();
    expect(data[0]).toBeInstanceOf(Article);
})