import axios from "axios";
import { baseUrl, constStrings } from "./constString";
import { logout } from "./logout";

export const getLSTokenDetails = (tokenKey: string) => {
    const token = localStorage?.getItem(tokenKey);
    if (!token) {
        return { refreshToken: null };
    }
    const tokenArray = token.split(".");
    const tokenPayload = JSON.parse(atob(tokenArray[1]));
    return { token, expiry: tokenPayload.exp * 1000 };
}


export const setLSToken = (tokenKey: string, token: string | null) => {
    if (token) {
        localStorage.setItem(tokenKey, token);
    } else {
        localStorage.removeItem(tokenKey);
    }
}

export const validateToken = async () => {
    const { token: accessToken, expiry: endDateAccessTS } = getLSTokenDetails(constStrings.ACCESS_TOKEN);
    const { token: refreshToken, expiry: endDateRefreshTS } = getLSTokenDetails(constStrings.REFRESH_TOKEN);

    if (accessToken && endDateAccessTS && endDateRefreshTS && refreshToken) {
        const endDateAccess = new Date(endDateAccessTS);
        const endDateRefresh = new Date(endDateRefreshTS - 24 * 60 * 60 * 1000);
        const currentDate = new Date();

        console.log({ currentDate, endDateRefresh, endDateAccess })
        if (currentDate < endDateRefresh && currentDate > endDateAccess) {
            const res = await axios.post(`${baseUrl}/api/v1/users/token`, {}, {
                headers: {
                    'Issuer': `${constStrings.ISSUER}`,
                    'Authorization': `Bearer ${refreshToken}`,
                    'Content-Type': 'application/json',
                }
            })
            if (res && res.data && res.data.data) {
                setLSToken(constStrings.ACCESS_TOKEN, res.data.data.access_token)
                return;
            }
        } else if (currentDate < endDateAccess) {
            return;
        }
    }

    logout()
}