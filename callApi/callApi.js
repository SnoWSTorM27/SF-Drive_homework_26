import {getAccessToken} from "./getAccessToken";
import { updateTokens } from "./updateTokens";

export async function callApi(url, method, body) {
    const accessToken = await getAccessToken();

    const response = await fetch(url, {
        method,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':`Bearer ${accessToken}`,
        },
        body:JSON.stringify(body),
    })
    .then(res => res.ok ? res : Promise.reject(res))
    .catch(err => {
        if(err.status === 403) {
            return updateTokens()
            .then(
                () => {
                    console.log('another try')
                    callApi(url, method, body)
                }
            )
        }
    })
    
    return response
}