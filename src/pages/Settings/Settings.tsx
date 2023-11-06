import styles from './Settings.module.scss'
import {FC} from "react"
import Header from "../../components/Header/Header";
import CurrencyButton from "../../components/CurrencyButton/CurrencyButton";


const Settings: FC = () => {
    return (
        <div className={styles.container}>
            <Header title={'Настройка активных валют'}/>
            <CurrencyButton title={'UDS'}/>
            <CurrencyButton title={'EUR'}/>
            <CurrencyButton title={'RUB'}/>

        </div>
    )
}
export default Settings;