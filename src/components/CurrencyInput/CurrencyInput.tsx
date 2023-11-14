import styles from './CurrencyInput.module.scss'
import {FC, useCallback, useEffect, useState} from "react"
import {currencyType} from "../../types/types";
import {RootState, useAppDispatch} from "../../redux/store";
import {setUsdInput, updateNewRatesExceptOne} from "../../redux/slices/currencySlice";
import {useSelector} from "react-redux";
import debounce from 'lodash.debounce'
import {Cell} from "@twa-dev/mark42";
import rubSVG from '../../assets/RUB.svg'
import usdSVG from '../../assets/USD.svg'
import eurSVG from '../../assets/EUR.svg'
import kztSVG from '../../assets/KZT.svg'
import tonSVG from '../../assets/TON.svg'
import defaultSVG from '../../assets/default.svg'


type CurrencyInputProps = {
    currency: currencyType;
}

const CurrencyInput: FC<CurrencyInputProps> = ({currency}) => {
    const [localInputValue, setLocalInputValue] = useState('')
    const [inputValue, setInputValue] = useState('')
    const dispatch = useAppDispatch()
    const {usdInput} = useSelector((state: RootState) => state.currencySlice)

    const debounceInput = useCallback(debounce((str) => {
        setInputValue(str)
    }, 0), [])

    const onChangeInput = (inputValue: string) => {
        debounceInput(inputValue)
        if (localInputValue[0] === '0') setLocalInputValue(inputValue.substring(1))
        else setLocalInputValue(inputValue)
    }

    useEffect(() => {
        const currencyInUsd = (Number(inputValue) / Number(currency.exchangeByUSD))
        dispatch(setUsdInput(currencyInUsd))
        dispatch(updateNewRatesExceptOne())
    }, [inputValue])

    useEffect(() => {
        const roundingThreeNumber = (Math.round(Number(currency.inputValue) * 1000) / 1000).toString()
        setLocalInputValue(roundingThreeNumber)
    }, [usdInput])


    const setSRC = () => {
        if (currency.name === 'TON') return tonSVG
        if (currency.name === 'USD') return usdSVG
        if (currency.name === 'KZT') return kztSVG
        if (currency.name === 'RUB') return rubSVG
        if (currency.name === 'EUR') return eurSVG
        return defaultSVG
    }

    return (
        <Cell
            className={styles.container}
            after={<img className={styles.currencyIcon} src={setSRC()} alt={'currency icon'}/>}
        >
            <div className={styles.inputBlock}>
                    <span className={styles.currencyName}>{currency.name}</span>
                <input
                    value={localInputValue}
                    onChange={(event) => onChangeInput(event.target.value)}
                    className={styles.currencyInput}
                    type="number"
                />
            </div>

        </Cell>
    )
}
export default CurrencyInput;