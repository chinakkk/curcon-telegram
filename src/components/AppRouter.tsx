import {FC} from "react"
import {Routes, Route, Navigate} from 'react-router-dom';
import {publicRoutes} from "../router";


const AppRouter: FC = () => {
    return (
        <>
            <Routes>
                {
                    publicRoutes.map((route) =>
                        <Route path={route.path}
                               element={<route.element/>}
                               key={route.path}
                        />
                    )
                }
                <Route path={'/*'} element={<Navigate to={'/'}/>}/>
            </Routes>
        </>
    )
}
export default AppRouter;