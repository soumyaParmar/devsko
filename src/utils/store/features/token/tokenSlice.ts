import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export interface CounterState {
  value: string
}

const initialState: CounterState = {
  value: ""
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state,action) => {
      state.value = action.payload
    },
    deleteToken: (state) => {
      state.value = "";
    }
  }
})

export const { setToken, deleteToken } = tokenSlice.actions

export const selectCount = (state: RootState) => state.token.value

export default tokenSlice.reducer