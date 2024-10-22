import { configureStore } from '@reduxjs/toolkit'
import preferredDevicesSlice from './features/preferredDevices/preferredDevicesSlice'
import snackbarSlice from './features/snackbar/snackbarSlice'
import UserInfoSlice from './features/userInfo/userInfoSlice'
import DecodedTokenSlice from './features/decodedToken/decodedTokenSlice'

export const createStore = () => {
  return configureStore({
    reducer: {
      preferredDevices: preferredDevicesSlice,
      snackbar: snackbarSlice,
      userInfo: UserInfoSlice,
      decodedToken: DecodedTokenSlice
    },
  })
}

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']