import HomePage from './pages/HomePage';

import AdminLogin from './pages/AdminLogin';
import AdminMenu from './pages/AdminMenu';
import AdminMenuReg from './pages/AdminMenuReg';

import UserMenuPage from './pages/UserMenuPage';
import UserModeSelectPage from './pages/UserModeSelectPage';
import UserRegPage from './pages/UserRegPage';
import AdminMenuEdit from './pages/AdminMenuEdit';
import UserRegCam from './pages/UserRegCam';
import UserRecCam from './pages/UserRecCam';
import UserOrderPage from './pages/UserOrderPage';
import AdminMenuShow from './pages/AdminMenuShow';
import UserAltCertPage from './pages/UserAltCertPage';
import AdminChangePw from './pages/AdminChangePw';

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
        path : '/user/rec/cam',
        component : UserRecCam
    },
    {
        path: '/user/rec/alt',
        component : UserAltCertPage
    },
    {
        path : '/user/reg',
        component : UserRegPage
    },
    {
        path : '/user/reg/cam',
        component : UserRegCam
    },
    {
        path : '/user/menu/:cid',
        component : UserMenuPage
    },
    {
        path : '/user/order',
        component : UserOrderPage
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
        path : '/admin/menu/:id',
        component : AdminMenuShow
    },
    {
        path : '/admin/menu/reg',
        component : AdminMenuReg
    },
    {
        path : '/admin/menu/:id/edit',
        component : AdminMenuEdit
    },
    {
        path : '/admin/changepw',
        component : AdminChangePw
    },

]

export default routes;