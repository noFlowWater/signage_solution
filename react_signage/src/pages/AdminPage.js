import { Link } from "react-router-dom/cjs/react-router-dom.min";
import BacktoHome from "../components/BacktoHome";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AdminPage = () => {
    const history = useHistory();
    return (
        <div>
            <div className="container d-flex align-items-center justify-content-center">
                <h1>관리자 페이지</h1>
            </div>
            <div style = {{padding: '100px'}}>
                <div className="container d-flex align-items-center justify-content-center vh-50">
                    <div className="d-flex flex-column align-items-center">
                        <div>
                            <Link to="/admin/reg" style={{ textDecoration: 'none' }}>
                                <button style={{ background: 'transparent', border: 'none',paddingTop: '50px'}}>
                                    <img src={'/img/menuRegister.png'} alt="" height="100" width="370"/>   
                                </button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/admin/mod" style={{ textDecoration: 'none' }}>
                                <button style={{ background: 'transparent', border: 'none',paddingTop: '50px'}}>
                                    <img src={'/img/menuChange.png'} alt="" height="100" width="370"/>   
                                </button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/admin/del" style={{ textDecoration: 'none' }}>
                                <button style={{ background: 'transparent', border: 'none',paddingTop: '50px'}}>
                                    <img src={'/img/menuDelete.png'} alt="" height="100" width="370"/>   
                                </button>
                            </Link>
                        </div>
                        <div className = "BacktoHome mt-5">
                        <BacktoHome />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;