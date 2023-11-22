import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './UserCartContext';

const UserMenu = () => {
    // const { id } = useParams(); // URL에서 id 값을 추출
    // const [menus, setMenus] = useState([]); // 메뉴 정보를 저장할 state
    // const { dispatch } = useContext(CartContext);

    // useEffect(() => {
    //     // 서버에서 메뉴 정보를 불러오는 함수
    //     const fetchMenus = async () => {
    //         const response = await axios.get(`your_server_url/menu/${id}`);
    //         setMenus(response.data);
    //     }

    //     fetchMenus();
    // }, [id]); // id 값이 변경될 때마다 서버에서 메뉴 정보를 다시 불러옴

    // return (
    //     <div>
    //         {menus.map((menu, index) => (
    //             <div key={index} onClick={() => dispatch({ type: 'ADD_ITEM', item: menu })}>
    //                 <h1>{menu.name}</h1>
    //                 <p>{menu.price}</p>
    //                 <img src={menu.image} alt={menu.name} />
    //             </div>
    //         ))}
    //     </div>
    // );
    return (
        <div>
        <div> 메뉴 가져올 것</div>
        <div> 메뉴 2</div>
        <div> 메뉴 3</div>
        <div> 메뉴 4</div>
        <div> 메뉴 5</div>
        <div> 메뉴 6</div>
        <div> 메뉴 7</div>
        <div> 메뉴 8</div>
        <div> 메뉴 9</div>
        <div> 메뉴 10</div>
        <div> 메뉴 11</div>
        </div>
    )
}

export default UserMenu;