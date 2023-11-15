import { Link } from "react-router-dom/cjs/react-router-dom.min";
import BacktoHome from "../components/BacktoHome";
import { Modal } from "../components/Modal";

const UserFaceCheckPage = () => {
    return (
        <div style={{padding : '200px'}}>
            <div className="container d-flex align-items-center justify-content-center vh-50">
                <div className="d-flex flex-column align-items-center">
                    <h1>얼굴 인식 화면을 띄울 것입니다.</h1>
                    <div className = "BacktoHome mt-5">
                        <BacktoHome />
                        </div>
                    <div>
                        <Link to="/user/menu" style={{ textDecoration: 'none'}}>
                            <button className="btn btn-danger mt-5">
                            얼굴 인증 완료   
                            </button>
                        </Link>
                    </div>
                    <Modal />
                </div>
            </div>
        </div>
    )
}

export default UserFaceCheckPage;