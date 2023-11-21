import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavBar from "../components/UserNavBar";

const UserMenuPage = () => {
    const { id } = useParams(); // URL에서 id 값을 추출
    const [menus, setMenus] = useState([]); // 메뉴 정보를 저장할 state

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
    //         <UserNavBar />

    //         {menus.map((menu, index) => (
    //             <div key={index}>
    //                 <h1>{menu.name}</h1>
    //                 <p>{menu.price}</p>
    //                 <img src={menu.image} alt={menu.name} />
    //             </div>
    //         ))}
    //     </div>
    // );
    return (
        <div>
            <UserNavBar />

            <div className="d-flex flex-column align-items-center">
                메뉴 페이지
            </div>
            
        </div>
    )
}

export default UserMenuPage;