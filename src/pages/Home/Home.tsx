// import styles from './Home.module.scss'
import {FC, useEffect, useState} from "react"
import CurrencyInput from "../../components/CurrencyInput/CurrencyInput";
import {MainButton} from "@twa-dev/sdk/dist/react";
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";
import {currencyType} from "../../types/types";
import {setCurrencies, setExchangeUsdByName} from "../../redux/slices/currencySlice";
import {getUserCurrencies} from "../../apiService/getUserCurrencies";
import {getCurrencies} from "../../apiService/getCurrencies";
import {Page, Section} from "@twa-dev/mark42";


const Home: FC = () => {
    const [mainButtonIsVisible, setMainButtonIsVisible] = useState(true)
    const {currencies} = useSelector((state: RootState) => state.currencySlice)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onClickMainSettings = () => {
        navigate('/settings')
        setMainButtonIsVisible(false)
    }
    useEffect(() => {

        (async () => {
            if (!currencies.length) {
                const data = await getUserCurrencies()
                dispatch(setCurrencies(data))
            }

            getCurrencies().then((data:{name:string,rateByUsd:string}[]) => {
                for (const currencyData of data) {
                    dispatch(setExchangeUsdByName({currencyName:currencyData.name, exchangeByUSD:currencyData.rateByUsd}))
                }
            })

        })()



    }, [])

    return (
        <>
            <Page mode="secondary">
                <Section
                    header="Currency converter"
                >
                    {
                        currencies
                            .filter((currency: currencyType) => currency.added)
                            .map((currency: currencyType) => <CurrencyInput currency={currency}
                                                                            key={currency.name}/>)
                    }
                </Section>
            {/*<button onClick={onClickMainSettings} className={styles.testButton}>Settings</button>*/}
            {
                mainButtonIsVisible && <MainButton text={'Settings'} onClick={onClickMainSettings}/>
            }
            </Page>






        </>

    )
}
export default Home;