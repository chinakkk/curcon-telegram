import {configureStore} from '@reduxjs/toolkit';
import currencySlice from "./slices/currencySlice";
import {useDispatch} from "react-redux";

export default configureStore({
    reducer: {
        currencySlice
    },
});


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()