import {Action, combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector, useStore} from "react-redux";
import todoReducer from "./slices/todo/todo.slice"
import toastReducer from "./slices/toast/toast.slice"

const store = configureStore({
    reducer: combineReducers({
        todo: todoReducer,
        toast: toastReducer
    })
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



export default store;