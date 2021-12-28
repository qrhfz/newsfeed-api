import { extractMetadata, getLiputan6FrontPage, searchNewsLinks } from "../../liputan6";

// it('mengambil liputan 6', async ()=>{
//     const data = await getLiputan6FrontPage();
//     console.log(data)
// });

// it('mendapatkan link dari html liputan 6', ()=>{
//     const html = `<!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Document</title>
//     </head>
//     <body>
//         <a href="https://www.liputan6.com/regional"></a>
//         <a href="https://www.otosia.com/"></a>
//         <a href="https://www.liputan6.com/showbiz/read/4837113/giring-ganesha-berstatus-mahasiswa-drop-out-dari-kampus-yang-pernah-dipimpin-anies-baswedan"></a>
//     </body>
//     </html>
//     `


//     const newsUrls = searchNewsLinks(html);
//     expect(newsUrls[0]).toBe("https://www.liputan6.com/showbiz/read/4837113/giring-ganesha-berstatus-mahasiswa-drop-out-dari-kampus-yang-pernah-dipimpin-anies-baswedan");
//     expect(newsUrls.length).toBe(1);
// });

it('mengambil judul dari artikel', async ()=>{
    const article = await extractMetadata("https://www.liputan6.com/regional/read/4839547/reaksi-doddy-sudrajat-dengar-gala-sky-dapat-rumah-baru-seharga-rp24-miliar");
    expect(article?.title).toBe("Reaksi Doddy Sudrajat Dengar Gala Sky Dapat Rumah Baru Seharga Rp2,4 Miliar - Regional Liputan6.com")
})