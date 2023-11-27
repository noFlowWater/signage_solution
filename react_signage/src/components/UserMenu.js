import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './UserCartContext';
import { kiosk } from '../constants';
import { useLocation, useParams } from 'react-router-dom';

const UserMenu = () => {
    const location = useLocation();
    const { cid } = useParams();
    // const hash = window.location.hash; // 예: "#/user/menu/123"
    // const hashParts = hash.split('/'); // ["#", "user", "menu", "123"]
    // const eid = hashParts[3]; // 매개변수인 id를 추출합니다. 예: "123"
    // // const id = decodeURIComponent(eid);

    const [menus, setMenus] = useState([]); // 메뉴 정보를 저장할 state
    const { dispatch } = useContext(CartContext);

    useEffect(() => {
        // 서버에서 메뉴 정보를 불러오는 함수
        const fetchMenus = async () => {
            try {
                const response = await axios.get(`${kiosk}/menu/${cid}`);
                setMenus(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMenus();
    }, [cid]); // id 값이 변경될 때마다 서버에서 메뉴 정보를 다시 불러옴
    
    // menu_name: true,
    // menu_discription: true,
    // price: true,
    // file_path: true

    return (
        <div>
            {menus.map((menu, index) => (
                <div key={index} onClick={() => dispatch({ type: 'ADD_ITEM', item: menu })}>
                    <h1>{menu.menu_name}</h1>
                    <p>{menu.price}</p>
                    {/* <img src={menu.image} alt={menu.name} /> */}
                </div>
            ))}
        </div>
    );
}

export default UserMenu;