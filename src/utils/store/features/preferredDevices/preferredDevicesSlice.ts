import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export interface PreferredDevices {
  preferredMic: string | null,
  preferredCamera:string | null
}

const initialState: PreferredDevices = {
  preferredMic:null,
  preferredCamera:null
}

export const preferredDevicesSlice = createSlice({
  name: 'preferredDevices',
  initialState,
  reducers: {
    setPreferredMic: (state,action) => {
      state.preferredMic = action.payload
    },
    setPreferredCamera: (state,action) => {
      state.preferredCamera = action.payload;
    },
    removePreferredMic: (state) => {
        state.preferredMic = null
    },
    removePreferredCamera: (state) => {
        state.preferredCamera = null
    }
  }
})

export const { setPreferredCamera, setPreferredMic } = preferredDevicesSlice.actions

export const getPreferredMic = (state: RootState) => state.preferredDevices.preferredMic;
export const getPreferredCamera = (state:RootState) => state.preferredDevices.preferredCamera;

export default preferredDevicesSlice.reducer