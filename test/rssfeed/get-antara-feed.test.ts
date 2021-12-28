import { Article } from "../../src/entities/article";
import { getAntaraFeed } from "../../src/rssfeed/get-antara-feed";


it("return list of antara articles",async ()=>{
    const data = await getAntaraFeed();
    expect(data[0]).toBeInstanceOf(Article);
})