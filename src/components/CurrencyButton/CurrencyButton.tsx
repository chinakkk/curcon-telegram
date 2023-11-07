import styles from './CurrencyButton.module.scss'
import {FC, useState} from "react"
import {useSelector} from "react-redux";

type CurrencyButtonProps = {
    title:string;
}

const CurrencyButton: FC <CurrencyButtonProps>= ({title=''}) => {
    const {currencies} = useSelector((state) => state.currencySlice)
    const [currencyIsSelected,setCurrencyIsSelected]=useState<boolean>(false)
    console.log(currencies)
    return (
        <button
            className={`${styles.container} ${currencyIsSelected?styles.selected:''}`}
            onClick={() => setCurrencyIsSelected(prevState => !prevState)}
        >
            {title}
        </button>
    )
}
export default CurrencyButton;