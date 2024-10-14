import { baseUrl, constStrings } from "@/lib/constString";
import { emptyLocalStorage, logout } from "@/lib/logout";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLSTokenDetails, setLSToken } from "@/lib/tokenHandler";

const useAuthentication = () => {

    const router = useRouter();
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    const getAccessToken = async (authorizationCode: string | null) => {
        try {
            const res2 = await axios.get(`${baseUrl}/auth/v1/google/callback?code=${authorizationCode}`);
            return res2;
        } catch (error) {
            console.error('Error during API request:', error);
        }
    }

    useEffect(() => {
        const checkAuthentication = async () => {
            setIsAuthenticating(true);
            const { token: accessToken } = getLSTokenDetails(constStrings.ACCESS_TOKEN);
            const { token: refreshToken, expiry: endDateRefreshTS } = getLSTokenDetails(constStrings.REFRESH_TOKEN);
            const currentDate = new Date();

            if (endDateRefreshTS && accessToken && refreshToken) {
                const endDateRefreshMinusOneDayTS = endDateRefreshTS - 24 * 60 * 60 * 1000;
                const endDateRefreshMinusOneDay = new Date(endDateRefreshMinusOneDayTS);

                // check if refreshToken is going to expire in next one day
                if (currentDate > endDateRefreshMinusOneDay) {
                    logout();
                    return;
                }

                router.replace("/dashboard/1")
                return;
            }

            emptyLocalStorage();
            const urlParams = new URLSearchParams(window.location.search);
            const authorizationCode = urlParams.get("code");

            if (authorizationCode) {
                const res = await getAccessToken(authorizationCode);
                if (res?.data) {
                    setLSToken(constStrings.ACCESS_TOKEN, res.data.data.access_token);
                    setLSToken(constStrings.REFRESH_TOKEN, res.data.data.refresh_token);

                    router.replace("/dashboard/1")
                    return;
                }

                logout();
                return;
            }

            setIsAuthenticating(false)
        }
        checkAuthentication();
    }, [router])

    const handleGoogleSignIn = () => {
        const googleClientId = process.env.NEXT_PUBLIC_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
        // Construct the Google OAuth URL
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&redirect_uri=${redirectUri}&scope=openid%20profile%20email`;
        // Redirect the user to Google OAuth2 login page
        window.location.href = googleAuthUrl;
    };

    return { handleGoogleSignIn, isAuthenticating, }
}

export default useAuthentication