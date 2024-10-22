import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { DecodedToken } from '@/utils/types/decodedtoken'

export interface DecodedTokenState extends DecodedToken {
}

const initialState: DecodedTokenState = {
    sub: null,
    email: null,
    name: null,
    picture: null,
    iss: null,
    aud: null,
    exp: null,
    iat: null,
    claims: {
        TokenType: null,
        userid: null
    }
}

export const DecodedTokenSlice = createSlice({
    name: 'decodedToken',
    initialState,
    reducers: {
        setDecodedToken: (state, action: PayloadAction<DecodedTokenState>) => {
            return { ...state, ...action.payload };
        },
    }
})

export const { setDecodedToken } = DecodedTokenSlice.actions

export const getDecodedToken = (state: RootState) => state.decodedToken;

export default DecodedTokenSlice.reducer