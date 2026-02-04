import axios, { AxiosRequestConfig } from "axios"
import { HttpsProxyAgent } from "https-proxy-agent"
const agent = new HttpsProxyAgent("http://proxy.us.dell.com:80")
export async function proxyRequest<T>(
    config: AxiosRequestConfig
): Promise<T> {
    const res = await axios({
        ...config,
       // httpsAgent:agent,
        proxy:false
    })
    
    return res.data
}