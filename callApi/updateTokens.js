import {ACCESS_TOKEN_STORAGE_KEY,REFRESH_TOKEN_STORAGE_KEY} from "./constants"

export const updateTokens = async() => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

    const response = await fetch("/auth/refresh", {
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body:JSON.stringify({refreshToken}),
    });

    const data = await response.json();
    
    if (response.ok) {
        localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, data.refreshToken);
        return data.accessToken;
    } else if (data.error) {
        throw new Error(data.error);
    }
}