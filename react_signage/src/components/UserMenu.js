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

    const userId = localStorage.getItem('userId');
    console.log("현재 사용자 : ", userId);

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
        // 원래 코드 : 세로로 하나씩 출력
        // <div>
        //     {menus.map((menu, index) => (
        //         <div key={index} onClick={() => addToCart(menu)}>
        //             <h1>{menu.menu_name}</h1>
        //             <p>{menu.price}</p>
        //         </div>
        //     ))}
        // </div>

        // 수정 코드 : 한 열에 3개씩 출력 (사진/메뉴 이름/가격)
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {menus.map((menu, index) => (
                <div key={index} onClick={() => addToCart(menu)} style={{ width: '33%', padding: '10px' }}>
                    <img src={menu.file_path} alt={menu.menu_name} style={{ width: '100%', marginBottom: '10px' }} />
                    <h1>{menu.menu_name}</h1>
                    <p>{menu.price}</p>
                </div>
            ))}
        </div>
    );
}

export default UserMenu;
