import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './features/token/tokenSlice'

export const createStore = () =>{
  return configureStore({
    reducer: {
      token: tokenReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof createStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']