import { Article } from "../../entities/article";
import { getAntaraFeed } from "../../antara/get-antara-feed";


it("return list of antara articles",async ()=>{
    const data = await getAntaraFeed();
    expect(data[0]).toBeInstanceOf(Article);
})