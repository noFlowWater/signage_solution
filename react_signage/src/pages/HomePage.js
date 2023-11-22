import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const HomePage = () => {
    const history = useHistory();
    return (
        <div style={{ backgroundImage: `url(${require('../img/HomeBG.png')})`, backgroundSize: 'cover', backgroundPosition: 'center',width: '100vw', height: '100vh', paddingTop: '100px'}}>
            <div className="container d-flex align-items-center justify-content-center vh-50">
                <div className="d-flex flex-column align-items-center">
                    <img src={require('../img/Logo.png')} alt="Logo" height="220" width="720"/>

                    <div style = {{paddingTop: '30px'}}>
                        <Link to="/user/mode" style={{ textDecoration: 'none' }}>
                            <button type="button" style={{ background: 'transparent', border: 'none',paddingTop: '30px'}}>
                                <img src={require('../img/StartBtn.png')} alt="" height="130" width="613"/>   
                            </button>
                        </Link>
                    </div>

                    <div style = {{paddingTop:'100px'}}>

                        <Link to="/admin/login" style={{ textDecoration: 'none' }}>
                            <button type="button" style={{ background: 'transparent', border: 'none'}}>
                                <img src={require('../img/AdminBtn.png')} alt="" height="40" width="143"/>   
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;