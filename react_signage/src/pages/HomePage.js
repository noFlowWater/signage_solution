import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const HomePage = () => {
    const history = useHistory();
    return (
        <div style={{ backgroundImage: "url(/img/home.png)", backgroundSize: 'cover', backgroundPosition: 'center',width: '100vw', height: '100vh', paddingTop: '100px'}}>
            <div className="container d-flex align-items-center justify-content-center vh-50">
                <div className="d-flex flex-column align-items-center">
                    <img src={'/img/logo.png'} alt="Logo" height="200" width="655"/>
                    <div>
                        <Link to="/face" style={{ textDecoration: 'none' }}>
                            <button type="button" style={{ background: 'transparent', border: 'none',paddingTop: '30px'}}>
                                <img src={'/img/startButton.png'} alt="" height="200" width="655"/>   
                            </button>
                        </Link>
                    </div>

                    <div>
                        <Link to="/admin/login" style={{ textDecoration: 'none'}}>
                            <button  className="btn btn-primary">
                            관리자 모드
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;