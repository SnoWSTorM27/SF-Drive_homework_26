import {ACCESS_TOKEN_UPDATE_DIFF, MILLISECONDS_IN_SECOND} from "./constants"

export const isTokenValid = expiresAt => {
    const currentTime = Math.round (Date.now() / MILLISECONDS_IN_SECOND);
    const difference = expiresAt - currentTime;
    return difference > ACCESS_TOKEN_UPDATE_DIFF;
}