import axios from "axios";

const headers = { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0' }
export async function fetchHtmlPage(url: string): Promise<string|null>{
    try {
        const { data } = await axios.get(url, {
            headers: headers
        });
        return data
    } catch (e) {
        return null;
    }
}