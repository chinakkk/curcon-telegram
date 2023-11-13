import styles from './CurrencyInput.module.scss'
import {FC, useCallback, useEffect, useState} from "react"
import {currencyType} from "../../types/types";
import {RootState, useAppDispatch} from "../../redux/store";
import {setUsdInput, updateNewRatesExceptOne} from "../../redux/slices/currencySlice";
import {useSelector} from "react-redux";
import debounce from 'lodash.debounce'
import {Cell} from "@twa-dev/mark42";
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
    }, 500), [])

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
    const setSRC = (currencyName:string) => {
        if (currencyName===currency.name) return `/src/assets/${currencyName}.svg`
        return defaultSVG
    }

    return (
        <Cell
            className={styles.container}
            after={<img src={setSRC(currency.name)} alt={'currency icon'}/>}
        >
                <span className={styles.inputBlock}>
                    {currency.name}
                    <input
                        value={localInputValue}
                        onChange={(event) => onChangeInput(event.target.value)}
                        className={styles.currencyInput}
                        type="number"
                    /></span>

        </Cell>
    )
}
export default CurrencyInput;