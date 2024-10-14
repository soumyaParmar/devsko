import { constStrings } from "@/lib/constString";
import { getLSTokenDetails } from "@/lib/tokenHandler";

export function getConfigHeader() {
    const { token:accessToken } = getLSTokenDetails(constStrings.ACCESS_TOKEN);

    return {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Issuer': `${constStrings.ISSUER}`
    }
}