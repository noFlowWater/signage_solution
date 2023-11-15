import {Link,NavLink} from 'react-router-dom';
// navbar-dark bg-dark
const AdminNavBar = () => {
    return (
        <nav className="navbar navbar-tranparent">
            <div className="container">
                <ul id="nav2" className="nav container-fluid justify-content-center navbar-height">
                    <li className="nav-item me-5">
                        <NavLink 
                        activeClassName = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/"
                        style={{ textDecoration: 'none' }}>
                        HOME</NavLink>
                    </li>
                    

                    <li className="nav-item me-5">
                        <NavLink 
                        activeClassName = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/"
                        style={{ textDecoration: 'none' }}>
                        김밥</NavLink>
                    </li>

                    <li className="nav-item me-5">
                        <NavLink 
                        activeClassName = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/"
                        style={{ textDecoration: 'none' }}>
                        라면</NavLink>
                    </li>
                    <li className="nav-item me-5">
                    <NavLink 
                        activeClassName = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/"
                        style={{ textDecoration: 'none' }}>
                        떡볶이</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink 
                        activeClassName = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/"
                        style={{ textDecoration: 'none' }}>
                        음료</NavLink>
                    </li>
                </ul> 
            </div>
        </nav>
    );
};

export default AdminNavBar;