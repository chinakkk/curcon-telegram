import styles from './CurrencyInput.module.scss'
import {FC} from "react"
import currencyIcon from '../../assets/currencyIcon.svg'

type CurrencyInputProps = {
    currencyName:string;
}

const CurrencyInput: FC <CurrencyInputProps>= ({currencyName=''}) => {
    return (
        <div className={styles.container}>
            <img src={currencyIcon} alt={'currency icon'}/>
            <input className={styles.currencyInput}
                type="text"/>
            <span className={styles.currencyName}>{currencyName}</span>
        </div>
    )
}
export default CurrencyInput;