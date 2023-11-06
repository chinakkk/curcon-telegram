import styles from './Header.module.scss'
import {FC} from "react"

type HeaderProps = {
    title: string;
}

const Header: FC<HeaderProps> = ({title = ''}) => {
    return (
        <div className={styles.container}>
            {title}
        </div>
    )
}
export default Header;