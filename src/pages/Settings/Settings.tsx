import styles from './Settings.module.scss'
import {FC, useState} from "react"
import Header from "../../components/Header/Header";
import CurrencyButton from "../../components/CurrencyButton/CurrencyButton";
import {BackButton, MainButton} from "@twa-dev/sdk/dist/react";
import {useNavigate} from 'react-router-dom';

const Settings: FC = () => {
    const currencies = ['USD', 'EUR', 'RUB', 'KZ', 'BTC']
    const [mainButtonIsVisible, setMainButtonIsVisible] = useState(true)
    const [backButtonIsVisible, setBackButtonIsVisible] = useState(true)
    const navigate = useNavigate()

    const onClickMainSave = () => {
        navigateToSettings()
        console.log('main')

    }
    const onClickBack = () => {
        navigateToSettings()
        console.log('back')
    }
    const navigateToSettings=() => {
        navigate('/')
        setMainButtonIsVisible(false)
        setBackButtonIsVisible(false)
    }


    return (
        <>
            <div className={styles.container}>
                <Header title={'Настройка активных валют'}/>
                {
                    currencies.map((currencyName) => <CurrencyButton title={currencyName}/>)
                }


            </div>
            {
                mainButtonIsVisible && <MainButton text={'Save'} onClick={onClickMainSave}/>
            }
            {
                backButtonIsVisible && <BackButton onClick={onClickBack}/>
            }
        </>
    )
}
export default Settings;