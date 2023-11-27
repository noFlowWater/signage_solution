import {Link,NavLink} from 'react-router-dom';
// navbar-dark bg-dark
const AdminNavBar = () => {
    return (
        <nav className="navbar navbar">
            <div className="container">
                <ul id="nav2" className="nav container-fluid justify-content-center navbar-height">
                    <li className="nav-item me-5">
                        <NavLink 
                        activeClassName = "active"
                        className="btn btn-primary" 
                        aria-current="page" 
                        to="/"
                        style={{ textDecoration: 'none' }}>
                        HOME</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink 
                        activeClassName = "active"
                        className="btn btn-danger" 
                        aria-current="page" 
                        to="/admin/menu/reg"
                        style={{ textDecoration: 'none' }}>
                        메뉴 등록</NavLink>
                    </li>
                </ul> 
            </div>
        </nav>
    );
};

export default AdminNavBar;