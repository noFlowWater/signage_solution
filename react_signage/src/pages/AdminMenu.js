import { Link } from "react-router-dom/cjs/react-router-dom.min";
import BacktoHome from "../components/BacktoHome";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AdminNavBar from "../components/AdminNavBar";

const AdminMenu = () => {
    return (
        <div>
            <AdminNavBar />
            관리자 메뉴 페이지
        </div>
    )
}

export default AdminMenu;