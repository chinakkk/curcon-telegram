import styles from './CurrencyButton.module.scss'
import {FC, useState} from "react"
import {useSelector} from "react-redux";
import {currencyType} from "../../types/types";
import {RootState, useAppDispatch} from "../../redux/store";
import {addCurrency, deleteCurrency} from "../../redux/slices/currencySlice";

type CurrencyButtonProps = {
    title: string;
}

const CurrencyButton: FC<CurrencyButtonProps> = ({title = ''}) => {
    const {currencies} = useSelector((state:RootState) => state.currencySlice)
    const currentCurrency:currencyType | undefined= currencies.find((currency:currencyType) => currency.name === title)
    const [currencyIsSelected, setCurrencyIsSelected] = useState<boolean>(currentCurrency?.added||false)
    const dispatch=useAppDispatch()

    const onClickCurrency = () => {
        setCurrencyIsSelected(prevState => !prevState)
        if (currencyIsSelected) dispatch(deleteCurrency(currentCurrency?.name||''))
        else dispatch(addCurrency(currentCurrency?.name||''))
    }
    return (
        <button
            className={`${styles.container} ${currencyIsSelected ? styles.selected : ''}`}
            onClick={onClickCurrency}
        >
            {title}
        </button>
    )
}
export default CurrencyButton;