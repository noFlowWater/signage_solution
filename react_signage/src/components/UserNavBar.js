import { NavLink } from "react-router-dom";
// navbar-dark bg-dark
const UserNavBar = () => {
    return (
        <nav className="navbar navbar-tranparent navbar-height">
            <div className="container">
                <ul id="nav2" className="nav container-fluid justify-content-center">
                    <li className="nav-item me-5">
                        <NavLink 
                        activeClassName = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/"
                        style={{ textDecoration: 'none',fontFamily: 'SansM',fontSize: '25px' }}>
                        HOME</NavLink>
                    </li>
                    
                    <li className="nav-item me-5">
                        <NavLink 
                        activeClassName = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/user/menu/0"
                        style={{ textDecoration: 'none',fontFamily: 'SansM',fontSize: '25px' }}>
                        추천</NavLink>
                    </li>

                    <li className="nav-item me-5">
                        <NavLink 
                        activeClassName = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/user/menu/1"
                        style={{ textDecoration: 'none',fontFamily: 'SansM',fontSize: '25px' }}>
                        김밥</NavLink>
                    </li>

                    <li className="nav-item me-5">
                        <NavLink 
                        activeClassName = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/user/menu/2"
                        style={{ textDecoration: 'none',fontFamily: 'SansM',fontSize: '25px' }}>
                        라면</NavLink>
                    </li>
                    <li className="nav-item me-5">
                    <NavLink 
                        activeClassName = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/user/menu/3"
                        style={{ textDecoration: 'none',fontFamily: 'SansM',fontSize: '25px' }}>
                        떡볶이</NavLink>
                    </li>
                    <li className="nav-item me-5">
                    <NavLink 
                        activeClassName = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/user/menu/4"
                        style={{ textDecoration: 'none',fontFamily: 'SansM',fontSize: '25px' }}>
                        돈가스</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink 
                        activeClassName = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/user/menu/5"
                        style={{ textDecoration: 'none',fontFamily: 'SansM',fontSize: '25px' }}>
                        사이드</NavLink>
                    </li>
                </ul> 
            </div>
        </nav>
    );
};

export default UserNavBar;