import axios from "axios";
import {currencyType} from "../types/types";

export const getUserCurrencies = async () => {
    const data = (await axios.get('https://654ce46377200d6ba859a10c.mockapi.io/currencies')).data
    return data
        .map((currency:currencyType) => {
            return {
                id:currency.id,
                name: currency.name,
                added: currency.added,
                exchangeByUSD: '1',
                inputValue:''
            }
        })
}