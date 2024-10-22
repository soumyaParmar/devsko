import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SnackbarState {
    open: boolean;
    message: string;
    autohide: number;
    severity: 'success' | 'error' | 'warning';
}

export interface OpenSnackbarState {
    message: string;
    autohide?: number;
    severity?: 'success' | 'error' | 'warning';
}

const initialState: SnackbarState = {
    open: false,
    message: '',
    autohide: 3000,
    severity: 'success',
};

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        openSnackbar(state, action: PayloadAction<OpenSnackbarState>) {
            return { ...state, ...action.payload, open: true };
        },
        closeSnackbar(state) {
            state.open = false;
        },
    },
})

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer