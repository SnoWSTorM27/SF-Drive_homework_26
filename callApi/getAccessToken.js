import {ACCESS_TOKEN_STORAGE_KEY} from "./constants";

export const getAccessToken = async () => {
    
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    return accessToken;
};