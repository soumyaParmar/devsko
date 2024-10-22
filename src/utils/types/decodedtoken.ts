export type DecodedToken = {
    sub: number,
    email: string,
    name: string,
    picture: string,
    iss: string,
    aud: string,
    exp: number,
    iat: number,
    claims: Claims
}

type Claims = {
    TokenType: "access" | "refresh",
    userid: number
}