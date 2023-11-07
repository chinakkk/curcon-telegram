import styles from './Home.module.scss'
import {FC, useEffect, useState} from "react"
import Header from "../../components/Header/Header";
import CurrencyInput from "../../components/CurrencyInput/CurrencyInput";
import {MainButton} from "@twa-dev/sdk/dist/react";
import {useNavigate} from 'react-router-dom';


const Home: FC = () => {
    const [currentCurrency, setCurrentCurrency] = useState('USD')
    const [mainButtonIsVisible, setMainButtonIsVisible] = useState(true)
    const currencies = ['USD', 'EUR', 'RUB', 'KZ', 'BTC']
    const navigate = useNavigate()

    const onClickMainSettings = () => {
        navigate('/settings')
        setMainButtonIsVisible(false)
    }

    useEffect(() => {
        setCurrentCurrency('USD')
    })
    return (
        <>
            <div className={styles.container}>
                <Header title={'Конвертер валют'}/>
                <div className={styles.currentCurrency}>{currentCurrency}</div>
                {currencies.map((currencyName) => <CurrencyInput currencyName={currencyName}/>)}
            </div>
            {
                mainButtonIsVisible && <MainButton text={'Settings'} onClick={onClickMainSettings}/>
            }
        </>

    )
}
export default Home;