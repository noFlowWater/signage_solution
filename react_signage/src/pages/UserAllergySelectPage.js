import BacktoHome from "../components/BacktoHome";
import UserAllergyModal from "../components/UserAllergyModal";
import { Link } from "react-router-dom";

const UserAllergySelectPage = () => {
    return (
        <div>
            <UserAllergyModal content="알러지를 선택하세요" />
            <BacktoHome />
            <Link to = '/user/menu/1'>
                메뉴 보기
            </Link>
        </div>
    )
}

export default UserAllergySelectPage;