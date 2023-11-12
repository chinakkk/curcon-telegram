import axios from "axios";

export const getCurrencies = async () => {
    const data = (await axios.get('https://654ce46377200d6ba859a10c.mockapi.io/currenciesRate')).data
    return data
}