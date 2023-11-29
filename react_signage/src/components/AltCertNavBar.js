import { Link } from "react-router-dom";

const AltCertNavBar = () => {
    return (
        <nav className="navbar bg-transparent navbar-height" style = {{paddingTop: '15px'}}>
            <div className="container">
                <img src={require('../img/AltBtn.png')} alt="AltCert" height="100" width="300"/>
                <div style = {{
                    flexDirection: 'row'
                }} >
                <img src={require('../img/Logo.png')} alt="Logo" height="100" width="300"/>
                </div>
            </div>
        </nav>
    );
};

export default AltCertNavBar;