import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {currencyType} from "../../types/types.ts";

interface currencySliceType {
    currencies: currencyType[];
    usdInput: string;
}

const initialState: currencySliceType = {
    currencies: [],
    usdInput: ''

}
const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrencies(data, action: PayloadAction<currencyType[]>) {
            data.currencies = [...action.payload]
        },
        addCurrency(data, action: PayloadAction<string>) {
            data.currencies.forEach((currency) => {
                if (currency.name === action.payload) currency.added = true
            })
        },
        deleteCurrency(data, action: PayloadAction<string>) {
            data.currencies.forEach((currency) => {
                if (currency.name === action.payload) currency.added = false
            })
        },
        setUsdInput(data, action: PayloadAction<number>) {
            data.usdInput = (action.payload).toString()
        },
        setInputValueByName(data, action: PayloadAction<{ currencyName: string, inputValue: string }>) {
            const currentCurrency = data.currencies.find((currency) => currency.name === action.payload.currencyName)
            if (currentCurrency) currentCurrency.inputValue = action.payload.inputValue
        },
        setExchangeUsdByName(data, action: PayloadAction<{ currencyName: string, exchangeByUSD: string }>) {
            const currentCurrency = data.currencies.find((currency) => currency.name === action.payload.currencyName)
            if (currentCurrency) currentCurrency.exchangeByUSD = action.payload.exchangeByUSD
        },
        updateNewRatesExceptOne(data, action: PayloadAction<{ currencyName: string }>) {
            for (const currency of data.currencies) {
                if (currency.name !== action.payload.currencyName)
                    currency.inputValue = data.usdInput * currency.exchangeByUSD
            }
        }
    }

})

export const {
    setCurrencies,
    addCurrency,
    deleteCurrency,
    setUsdInput,
    setInputValueByName,
    setExchangeUsdByName,
    updateNewRatesExceptOne
} = currencySlice.actions
export default currencySlice.reducer