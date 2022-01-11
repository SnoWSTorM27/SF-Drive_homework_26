import {REFRESH_TOKEN_STORAGE_KEY} from "./constants"
import { saveTokens } from "./saveTokens";

export const updateTokens = async() => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

    const response = await fetch("/api/auth/refresh", {
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body:JSON.stringify({refreshToken}),
    });
    
    const data = await response.json();
    if (response.ok) {
        console.log('saving tokens')
        saveTokens(data)
        return data.accessToken;
    } else {
        throw new Error(data.message);
    }
}