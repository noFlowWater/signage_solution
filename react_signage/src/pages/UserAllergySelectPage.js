import BacktoHome from "../components/BacktoHome";
import UserAllergyModal from "../components/UserAllergyModal";

const UserAllergySelectPage = () => {
    return (
        <div>
            <UserAllergyModal content="알러지를 선택하세요" />
            <BacktoHome />
        </div>
    )
}

export default UserAllergySelectPage;