import Home from './pages/Home.jsx';
import Therapy from './pages/Therapy.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import PersonalAccount from './pages/PersonalAccount.jsx';
import PageDoctor from './pages/PageDoctor.jsx';
import NewsAndPromotions  from './pages/NewsAndPromotions.jsx';
import History from './pages/History.jsx';
import GroupPage from './pages/group.jsx';
import BlogPage from './pages/BlogPage.jsx';
import Admin from './pages/Admin.jsx';
import { Routes, Route } from 'react-router-dom';
import { AppContext } from './AppContext.js';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';



const publicRoutes = [
    {path: '/', Component: Home},
    {path: '/history_page', Component: History},
    {path: '/group_page', Component: GroupPage},
    {path: '/therapy/:id', Component: Therapy},
    {path: '/doctor_page/:id', Component: PageDoctor},
    {path: '/news', Component: NewsAndPromotions},
    {path: '/blog', Component: BlogPage},
    
]

const authRoutes = [
    {path: '/account', Component: PersonalAccount},
    {path: '/signUp', Component: SignUpPage}
]
const adminRoutes = [
    {path: '/admin', Component: Admin},
]

const AppRouter = () => {
    const { user } = useContext(AppContext)
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {user.isAdmin && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
        </Routes>
    )
}

export default AppRouter