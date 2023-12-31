import {FC, useEffect, useState} from "react"
import {BackButton, MainButton} from "@twa-dev/sdk/dist/react";
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";
import {setCurrencies} from "../../redux/slices/currencySlice";
import {updateUserCurrencies} from "../../apiService/updateUserCurrencies";
import {getUserCurrencies} from "../../apiService/getUserCurrencies";
import {Page, Section} from "@twa-dev/mark42";
import {currencyType} from "../../types/types";
import CurrencyButton from "../../components/CurrencyButton/CurrencyButton";
// import styles from './Settings.module.scss'



const Settings: FC = () => {
    const [mainButtonIsVisible, setMainButtonIsVisible] = useState(true)
    const [backButtonIsVisible, setBackButtonIsVisible] = useState(true)
    const {currencies} = useSelector((state: RootState) => state.currencySlice)
    const [initialCurrenciesRedux,setInitialCurrenciesRedux]=useState([])

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const onClickMainSave = () => {
        navigateToSettings()
        updateUserCurrencies(currencies).then().catch((error) => console.log(error, 'Error updateUserCurrencies'))
    }
    const onClickBack = () => {
        navigateToSettings()
        dispatch(setCurrencies(initialCurrenciesRedux))
    }
    const navigateToSettings = () => {
        navigate('/')
        setMainButtonIsVisible(false)
        setBackButtonIsVisible(false)
    }
    useEffect(() => {
        (async () => {
            const data = await getUserCurrencies()
            dispatch(setCurrencies(data))
            setInitialCurrenciesRedux(data)
        })()


    }, [])

    return (
        <>
            <Page mode="secondary">
                <Section
                    header="Setting active currencies"
                >
                    {
                        currencies.map((currency: currencyType) => <CurrencyButton title={currency.name}
                                                                                   key={currency.name}/>)
                    }
                </Section>
            </Page>
            {/*<button onClick={onClickMainSave} className={styles.testButton}>Save</button>*/}
            {/*<button onClick={onClickBack} className={styles.testButton}>back</button>*/}
            {/*<button onClick={() => getUserCurrencies()} className={styles.testButton}>test*/}
            {/*</button>*/}
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