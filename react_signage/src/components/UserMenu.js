import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './UserCartContext';
import { kiosk } from '../constants';
import { useLocation, useParams } from 'react-router-dom';

const UserMenu = () => {
    const location = useLocation();
    const { cid } = useParams();

    const [menus, setMenus] = useState([]);
    const { cart, dispatch } = useContext(CartContext);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get(`${kiosk}/menu/${cid}`);
                console.log(response.data)
                setMenus(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMenus();
    }, [cid]);

    const addToCart = (menu) => {
        const existingItem = cart.find(item => item.menu_name === menu.menu_name);
        if (existingItem) {
            dispatch({ type: 'INCREMENT_ITEM', item: existingItem });
        } else {
            dispatch({ type: 'ADD_ITEM', item: { ...menu, quantity: 1 } });
        }
    };

    return (
        <div>
            {menus.map((menu, index) => (
                <div key={index} onClick={() => addToCart(menu)}>
                    <h1>{menu.menu_name}</h1>
                    <p>{menu.price}</p>
                </div>
            ))}
        </div>
    );
}

export default UserMenu;
