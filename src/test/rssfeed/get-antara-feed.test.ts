import { Article } from "../../entities/article";
import Antara from "../../antara";


it("return list of antara articles",async ()=>{
    const data = await Antara();
    expect(data[0]).toBeInstanceOf(Article);
})