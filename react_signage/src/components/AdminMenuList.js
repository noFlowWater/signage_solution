import axios from "axios";
import { useEffect, useState } from "react";
import AdminMenuCard from "./AdminMenuCard";

const AdminMenuList = () => {
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(1); // 선택된 메뉴 버튼의 기본값은 1로 설정

    const getMenus = () => {
        axios.get(`http://172.20.16.146:4000/admin/${selectedMenu}`)
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

    const handleMenuButtonClick = (menuNumber) => {
        setSelectedMenu(menuNumber);
    };

    const renderMenuList = () => {
        return (
            <div style={{ marginTop: "16px" }}>
                {menus.map(menu => (
                    <AdminMenuCard
                        key={menu.id}
                        menu_name={menu.menu_name}
                    >
                        <button
                        className = "btn btn-danger btn-sm"
                        >
                            메뉴 삭제
                        </button>
                        </AdminMenuCard>
                ))}
            </div>
        );
    };

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                <button className="btn btn-success" style={{ marginRight: "10px" }} onClick={() => handleMenuButtonClick(1)}>김밥</button>
                <button className="btn btn-warning" style={{ marginRight: "10px", color: "white" }} onClick={() => handleMenuButtonClick(2)}>라면</button>
                <button className="btn btn-danger" style={{ marginRight: "10px" }} onClick={() => handleMenuButtonClick(3)}>떡볶이</button>
                <button className="btn" style={{ marginRight: "10px", backgroundColor: "brown", color: "white" }} onClick={() => handleMenuButtonClick(4)}>돈가스</button>
                <button className="btn btn-dark" style={{ marginRight: "10px" }} onClick={() => handleMenuButtonClick(5)}>사이드</button>
            </div>
            {renderMenuList()}
        </div>
    );
};

export default AdminMenuList;
