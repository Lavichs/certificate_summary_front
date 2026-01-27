import {
    NOT_FOUND,
    AUTHORIZATION_ROUTE,
    ANALYTICS_ROUTE,
    MONTH_ROUTE,
    ADMIN_ROUTE,
    HOME_ROUTE
} from "../consts";
import AnalyticsPage from "../pages/AnalyticsPage";
import AuthPage from "../pages/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";
import MonthPage from "../pages/MonthPage";
import AdminPage from "../pages/AdminPage";
import HomePage from "../pages/HomePage";

export const publicRoutes = [
    {path: HOME_ROUTE, Component: HomePage},
    {path: AUTHORIZATION_ROUTE, Component: AuthPage},
    {path: ANALYTICS_ROUTE, Component: AnalyticsPage},
    {path: MONTH_ROUTE, Component: MonthPage},
    {path: ADMIN_ROUTE, Component: AdminPage},

    {path: NOT_FOUND, Component: NotFoundPage},
]