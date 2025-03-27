import {createSlice} from '@reduxjs/toolkit'
import { RootState } from '@store/store'


type ToastType = "success" | "error" | null
interface ToastInitialState {
    message: string | null
    type : ToastType
    timer: number
}
const initialState = {
    message: null,
    type: null,
    timer: 3000,
} as ToastInitialState

export const toastSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        successToast: (state: ToastInitialState, action) => {
            state.message = action.payload
            state.type = 'success'
        },
        errorToast: (state:ToastInitialState, action) => {
            state.message = action.payload
            state.type = 'error'
        },
        clearToast: (state : ToastInitialState) => {
            state.message = null
            state.type = null
        },
    
    },
})

export const {
    successToast,
    clearToast,
    errorToast
} = toastSlice.actions
export const selectToast = (state: RootState) => state.toast

export default toastSlice.reducer