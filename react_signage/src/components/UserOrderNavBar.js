import { useNavigate } from 'react-router-dom';

const UserOrderNavBar = () => {
    const navigate = useNavigate();

    const handleClickLogo = () => {
        navigate('/');
    };

    return (
        <nav className="navbar bg-transparent navbar-height" style = {{paddingTop: '15px'}}>
            <div className="container">
                <img src={require('../img/Order.png')} alt="FaceReg" height="100" width="300"/>
                <div style = {{
                    flexDirection: 'row'
                }} >
                <img src={require('../img/Logo.png')} alt="Logo" height="100" width="300" onClick={handleClickLogo}/>
                </div>
            </div>
        </nav>
    );
};

export default UserOrderNavBar;