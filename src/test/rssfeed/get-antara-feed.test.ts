import { Article } from "../../entities/article";
import { getAntaraFeed } from "../../rssfeed/get-antara-feed";


it("return list of antara articles",async ()=>{
    const data = await getAntaraFeed();
    expect(data[0]).toBeInstanceOf(Article);
})