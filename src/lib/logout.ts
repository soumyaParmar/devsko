import { constStrings } from "./constString";
import { setLSToken } from "./tokenHandler";

export const logout = () => {
    emptyLocalStorage();

    window.location.href = "/";
}

export const emptyLocalStorage = () => {
    setLSToken(constStrings.ACCESS_TOKEN, null);
    setLSToken(constStrings.REFRESH_TOKEN, null);
}