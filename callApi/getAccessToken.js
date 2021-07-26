import {ACCESS_TOKEN_STORAGE_KEY} from "./constants"

export const getAccessToken = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    const tokenData = decodeToken(accessToken);
    const isAccessTokenValid = isTokenValid(tokenData.exp);

    if (!isAccessTokenValid){
        return await updateTokens();
    }
    return accessToken;
};