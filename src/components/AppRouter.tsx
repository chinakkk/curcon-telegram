import {FC} from "react"
import {Routes, Route} from 'react-router-dom';
import {publicRoutes} from "../router";


const AppRouter: FC = () => {
    return (
        <>
            <Routes>
                {/*<Route path={'/*'} element={<Navigate to={'/'}/>}/>*/}
                {
                    publicRoutes.map((route) =>
                        <Route path={route.path}
                               element={<route.element/>}
                               key={route.path}
                        />
                    )
                }
            </Routes>
        </>
    )
}
export default AppRouter;