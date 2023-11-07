import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {currenciesType} from "../../types/types.ts";

interface currencySliceType {
    currencies: currenciesType;
}

const initialState: currencySliceType = {
    currencies: {
        USD: false,
        EUR: false,
        RUB: false,
        KZ: false,
        BTC: false,
    }
}
const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrencies(data, action: PayloadAction<currenciesType>) {
            data.currencies = action.payload
        },
        addCurrency(data, action: PayloadAction<string>) {
            data.currencies[action.payload] = true
        },
        deleteCurrency(data, action: PayloadAction<string>) {
            data.currencies[action.payload] = false
        },
    }

})

export const {
    setCurrencies,
    addCurrency,
    deleteCurrency
} = currencySlice.actions
export default currencySlice.reducer