import styles from './CurrencyInput.module.scss'
import {FC, useCallback, useEffect, useState} from "react"
import currencyIcon from '../../assets/currencyIcon.svg'
import {currencyType} from "../../types/types";
import {RootState, useAppDispatch} from "../../redux/store";
import {setUsdInput, updateNewRatesExceptOne} from "../../redux/slices/currencySlice";
import {useSelector} from "react-redux";
import debounce from 'lodash.debounce'

type CurrencyInputProps = {
    currency: currencyType;
}

const CurrencyInput: FC<CurrencyInputProps> = ({currency}) => {
    const [localInputValue,setLocalInputValue]=useState('')
    const [inputValue,setInputValue]=useState('')
    const dispatch = useAppDispatch()
    const {usdInput} = useSelector((state:RootState) => state.currencySlice)

    const debounceInput = useCallback(debounce((str) => {
        setInputValue(str)
    },500),[])

    const onChangeInput = (inputValue) => {
        debounceInput(inputValue)
        setLocalInputValue(inputValue)
    }
    useEffect(() => {
        console.log('Обновляем курс')
        const currencyInUsd = (Number(inputValue) / Number(currency.exchangeByUSD))
        dispatch(setUsdInput(currencyInUsd))
        dispatch(updateNewRatesExceptOne(currency.name))
    },[inputValue])

    useEffect(() => {
        const roundingThreeNumber = (Math.round(Number(currency.inputValue)*1000)/1000).toString()
        setLocalInputValue(roundingThreeNumber)
    },[usdInput])

    // useEffect(() => {
    //     const currencyInUsd = (Number(inputState) / Number(currency.exchangeByUSD))
    //     dispatch(setUsdInput(currencyInUsd))
    // }, [inputState])
    //
    // useEffect(() => {
    //     const convertCurrency=Number(usdInput)*Number(currency.exchangeByUSD)
    //     setInputState(convertCurrency.toString())
    // }, [usdInput])


    return (
        <div className={styles.container}>
            <img src={currencyIcon} alt={'currency icon'}/>
            <input
                value={localInputValue}
                onChange={(event) => onChangeInput(event.target.value)}
                className={styles.currencyInput}
                type="text"/>
            <span className={styles.currencyName}>{currency.name}</span>
        </div>
    )
}
export default CurrencyInput;