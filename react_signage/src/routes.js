import HomePage from './pages/HomePage';
import FaceCheckPage from './pages/FaceCheckPage';
import MenuPage from './pages/MenuPage';
import AdminLogin from './pages/AdminLogin';
import AdminMenu from './pages/AdminMenu';

const routes = [
    {
        path :'/',
        component : HomePage
    },
    {
        path : '/face',
        component : FaceCheckPage
    },
    {
        path : '/menu',
        component : MenuPage
    },
    {
        path : '/admin/login',
        component : AdminLogin
    },
    {
        path : '/admin/menu',
        component : AdminMenu
    }
]

export default routes;