import axios from "axios";
import { useEffect, useState } from "react";
import AdminMenuCard from "./AdminMenuCard";
import { useNavigate } from "react-router-dom";
import { kiosk } from "../constants";

const AdminMenuList = () => {
    const navigate = useNavigate();
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(1);
    const [selectedMenuTitle, setSelectedMenuTitle] = useState("김밥 카테고리");

    const getMenus = () => {
        axios.get(`${kiosk}/admin/${selectedMenu}`)
            .then(response => {
                const menusData = response.data;
                setMenus(menusData);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        getMenus();
    }, [selectedMenu]);

    const handleMenuButtonClick = (menuNumber, menuTitle) => { // 메뉴 타이틀 인자 추가
        setSelectedMenu(menuNumber);
        setSelectedMenuTitle(menuTitle); // 메뉴 타이틀 업데이트
    };

    const deleteMenu = (e, id) => {
        e.stopPropagation();
        axios.delete(`${kiosk}/admin/${id}`).then(()=>{
            setMenus(prevMenus => prevMenus.filter(menus=> menus.menu_id !== id))
        })
    }

    const renderMenuList = () => {
        return (
            <div style={{ marginTop: "16px" }}>
                {menus.map(menu => (
                <AdminMenuCard
                key={menu.menu_id}
                menu_name={menu.menu_name}
                onClick={()=>navigate(`/admin/menu/${menu.menu_id}`)}
            >
                <button
                className = "btn btn-danger btn-sm"
                onClick={(e) => deleteMenu(e, menu.menu_id)}
                style = {{fontFamily: 'SansM', fontSize:'15px'}}
                >
                    메뉴 삭제
                </button>
                </AdminMenuCard>
                ))}
            </div>
        );
    
    };

    return (
        <div className="nav-bar navbar-height" style={{ textAlign: "center" }}>
            <h1 
            className="ms-5" 
            style={{ textAlign: "start", marginLeft: "16px", fontFamily: 'SansM', fontSize:'35px' }}
            >{selectedMenuTitle}
            </h1>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px",fontFamily: 'SansM', fontSize:'30px'}}>
                <button className="btn btn-success" style={{ marginRight: "10px" }} onClick={() => handleMenuButtonClick(1, "김밥 카테고리")}>김밥</button>
                <button className="btn btn-warning" style={{ marginRight: "10px", color: "white" }} onClick={() => handleMenuButtonClick(2, "라면 카테고리")}>라면</button>
                <button className="btn btn-danger" style={{ marginRight: "10px" }} onClick={() => handleMenuButtonClick(3, "떡볶이 카테고리")}>떡볶이</button>
                <button className="btn" style={{ marginRight: "10px", backgroundColor: "brown", color: "white" }} onClick={() => handleMenuButtonClick(4, "돈가스 카테고리")}>돈가스</button>
                <button className="btn btn-dark" style={{ marginRight: "10px" }} onClick={() => handleMenuButtonClick(5, "사이드 카테고리")}>사이드</button>
            </div>
            {renderMenuList()}
        </div>
    );
};

export default AdminMenuList;