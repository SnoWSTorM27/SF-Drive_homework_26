

export async function callApi(url, method, body) {
    const accessToken = await getAccessToken();
    
    return fetch(url, {
        method,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':`Bearer ${accessToken}`,
        },
        body:JSON.stringify(body),
    });
}