import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux";
import store from "./redux/store";
import {AppearanceProvider} from "@twa-dev/mark42";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter basename={'/curcon-telegram'}>
            <Provider store={store}>
                <AppearanceProvider>

                    <App/>
                </AppearanceProvider>

            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
)
