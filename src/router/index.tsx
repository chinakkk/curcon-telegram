import Settings from "../pages/Settings/Settings";
import Home from "../pages/Home/Home";

export const RouteNames={
    HOME:'/curcon-telegram',
    SETTINGS:'/curcon-telegram/settings',
}

export const publicRoutes =[
    {
        path:RouteNames.HOME,
        element:Home,
    },
    {
        path:RouteNames.SETTINGS,
        element:Settings,
    },
]