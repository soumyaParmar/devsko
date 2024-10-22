const startingUrl = '/api/v1'

export const authenticateGetEP = (authorizationCode: string) => {
    return `/auth/v1/google/callback?code=${authorizationCode}`
}

export const googleAuthUrlEP = (googleClientId: string, redirectUri: string) => {
    return `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&redirect_uri=${redirectUri}&scope=openid%20profile%20email`
}

export const interviewHistoryGetEP = (userId: number) => {
    return `${startingUrl}/user/${userId}/interview/history`
}

export const recommendedInterviewsGetEP = (userId: number) => {
    return `${startingUrl}/interview/user/${userId}/recommendation`
}

export const userInfoGetEP = (userId: number) => {
    return `${startingUrl}/user/${userId}/info`
}

export const userSkillsGetEP = (userId: number) => {
    return `${startingUrl}/users/${userId}/skills`
}

export const accessTokenPostEP = () => {
    return `${startingUrl}/users/token/access`
}