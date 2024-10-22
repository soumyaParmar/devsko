import axios, { AxiosResponse } from "axios";
import { baseUrl, constStrings } from "./constString";
import { logout } from "./logout";
import { Response } from "@/utils/types";
import { AccessTokenB } from "@/models/Token";
import { DecodedToken } from "@/utils/types/decodedtoken";
import { accessTokenPostEP } from "./endPoints";

export const getLSTokenDetails = (tokenKey: string) => {
    const token = localStorage?.getItem(tokenKey);
    if (!token) {
        return { refreshToken: null };
    }
    const tokenArray = token.split(".");
    const tokenPayload = JSON.parse(atob(tokenArray[1]));
    return { token, expiry: tokenPayload.exp * 1000 };
}

export const getDecodedToken = (): DecodedToken => {
    const token = localStorage?.getItem(constStrings.ACCESS_TOKEN);
    const tokenArray = token.split(".");
    const tokenPayload = JSON.parse(atob(tokenArray[1])) as DecodedToken;
    return tokenPayload
}


export const setLSToken = (tokenKey: string, token: string | null) => {
    if (token) {
        localStorage.setItem(tokenKey, token);
    } else {
        localStorage.removeItem(tokenKey);
    }
}

export const validateToken = async (): Promise<boolean> => {
    const { token: accessToken, expiry: endDateAccessTS } = getLSTokenDetails(constStrings.ACCESS_TOKEN);
    const { token: refreshToken, expiry: endDateRefreshTS } = getLSTokenDetails(constStrings.REFRESH_TOKEN);

    if (accessToken && endDateAccessTS && endDateRefreshTS && refreshToken) {
        const endDateAccess = new Date(endDateAccessTS);
        const endDateRefresh = new Date(endDateRefreshTS - 24 * 60 * 60 * 1000);
        const currentDate = new Date();

        console.log({ currentDate, endDateRefresh, endDateAccess })
        if (currentDate < endDateRefresh && currentDate > endDateAccess) {
            let res: AxiosResponse<unknown, unknown>;
            try {
                res = await axios.post(`${baseUrl}${accessTokenPostEP()}`, {}, {
                    headers: {
                        'Issuer': `${constStrings.ISSUER}`,
                        'Authorization': `Bearer ${refreshToken}`,
                        'Content-Type': 'application/json',
                    }
                })
            } catch (error) {
                logout();
                return false;
            }
            const responseData = res.data as Response<AccessTokenB>;

            if (responseData && responseData.data) {
                setLSToken(constStrings.ACCESS_TOKEN, responseData.data.accessToken)
                return true;
            }
        } else if (currentDate < endDateAccess) {
            return true;
        }
    }

    logout()
    return false;
}