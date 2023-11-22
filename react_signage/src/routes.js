import HomePage from './pages/HomePage';

import AdminLogin from './pages/AdminLogin';
import AdminMenu from './pages/AdminMenu';
import AdminMenuReg from './pages/AdminMenuReg';

import UserFaceCheckPage from './pages/UserFaceCheckPage';
import UserMenuPage from './pages/UserMenuPage';
import UserModeSelectPage from './pages/UserModeSelectPage';
import UserRegPage from './pages/UserRegPage';
import AdminMenuEdit from './pages/AdminMenuEdit';

const routes = [
    {
        path :'/',
        component : HomePage
    },
    {
        path : '/user/mode',
        component : UserModeSelectPage
    },
    {
        path : '/user/face',
        component : UserFaceCheckPage
    },
    {
        path : '/user/reg',
        component : UserRegPage
    },
    {
        path : '/user/menu',
        component : UserMenuPage
    },
    {
        path : '/admin/login',
        component : AdminLogin
    },
    {
        path : '/admin/menu',
        component : AdminMenu
    },
    {
        path : '/admin/menu/reg',
        component : AdminMenuReg
    },
    {
        path : '/admin/menu/edit',
        component : AdminMenuEdit
    }

]

export default routes;