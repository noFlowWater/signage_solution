import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import FaceCheckPage from './pages/FaceCheckPage';
import MenuPage from './pages/MenuPage';
import AdminLogin from './pages/AdminLogin';

const routes = [
    {
        path :'/',
        component : HomePage
    },
    {
        path : '/admin',
        component : AdminPage
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
]

export default routes;