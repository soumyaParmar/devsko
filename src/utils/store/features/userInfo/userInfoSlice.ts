import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { UserInfo } from '@/models/UserInfo'

export interface UserInfoState extends UserInfo {
    profilePic: string,
    userId: number
}

const initialState: UserInfoState = {
    userId: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    gender: null,
    countryId: null,
    state: null,
    city: null,
    dob: null,
    profilePic: null,
}

export const UserInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
            return { ...state, ...action.payload };
        },
        setUserId: (state, action: PayloadAction<number>) => {
            return { ...state, userId: action.payload }
        }
    }
})

export const { setUserInfo, setUserId } = UserInfoSlice.actions

export const getUserInfo = (state: RootState) => state.userInfo;

export default UserInfoSlice.reducer