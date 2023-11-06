import styles from './CurrencyButton.module.scss'
import {FC} from "react"

type CurrencyButtonProps = {
    title:string;
}

const CurrencyButton: FC <CurrencyButtonProps>= ({title=''}) => {
    return (
        <button className={styles.container}>
            {title}
        </button>
    )
}
export default CurrencyButton;