import {ACCESS_TOKEN_STORAGE_KEY} from "./constants";
import {isTokenValid} from "./isTokenValid";
import {updateTokens} from "./updateTokens";
import { decodeToken } from "./decodeToken" 

export const getAccessToken = async () => {
    debugger
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    const tokenData = decodeToken(accessToken);
    const isAccessTokenValid = tokenData ? isTokenValid(tokenData.exp) : false;

    if (!isAccessTokenValid){
        return await updateTokens();
    }
    return accessToken;
};