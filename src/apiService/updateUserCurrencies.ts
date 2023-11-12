import axios from "axios";
import {currencyType} from "../types/types";

export const updateUserCurrencies = async (updatedUserCurrencies:currencyType[]) => {
    for (const updatedUserCurrency of updatedUserCurrencies) {
        await axios.put(`https://654ce46377200d6ba859a10c.mockapi.io/currencies/${updatedUserCurrency.id}`, {
            name: updatedUserCurrency.name,
            added: updatedUserCurrency.added
        })
    }
}