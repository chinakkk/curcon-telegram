import styles from './App.module.scss'
import AppRouter from "./components/AppRouter";

function App() {

    return (
        <div className={styles.container}>
            <AppRouter/>
        </div>
    )
}

export default App
