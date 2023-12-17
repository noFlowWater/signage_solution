import { NavLink } from "react-router-dom";

const UserNavBar = () => {
    return (
        <nav className="navbar navbar-tranparent navbar-height">
            <div className="container">
                <ul id="nav2" className="nav container-fluid justify-content-center" style={{ borderRadius: '15px', padding: '10px',width:'800px',background:'#FF4B4B',boxShadow: "0px 4px 10px rgba(0, 0, 0, 1)" }}>
                    <li className="nav-item me-2">
                        <NavLink 
                        activeclassname = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/"
                        style={{ textDecoration: 'none',fontFamily: 'SansM',fontSize: '25px',color:'white',textShadow: '2px 2px 4px rgba(0, 0, 0, 1)'}}>
                        HOME</NavLink>
                    </li>
                    
                    <li className="nav-item me-2">
                        <NavLink 
                        activeclassname = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/user/menu/0"
                        style={{ textDecoration: 'none',fontFamily: 'SansM',fontSize: '25px',color:'white',textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}>
                        추천</NavLink>
                    </li>

                    <li className="nav-item me-2">
                        <NavLink 
                        activeclassname = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/user/menu/1"
                        style={{ textDecoration: 'none',fontFamily: 'SansM',fontSize: '25px',color:'white',textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}>
                        김밥</NavLink>
                    </li>

                    <li className="nav-item me-2">
                        <NavLink 
                        activeclassname = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/user/menu/2"
                        style={{ textDecoration: 'none',fontFamily: 'SansM',fontSize: '25px',color:'white',textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}>
                        라면</NavLink>
                    </li>
                    <li className="nav-item me-2">
                    <NavLink 
                        activeclassname = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/user/menu/3"
                        style={{ textDecoration: 'none',fontFamily: 'SansM',fontSize: '25px',color:'white',textShadow: '2px 2px 4px rgba(0, 0, 0, 1)'}}>
                        떡볶이</NavLink>
                    </li>
                    <li className="nav-item me-2">
                    <NavLink 
                        activeclassname = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/user/menu/4"
                        style={{ textDecoration: 'none',fontFamily: 'SansM',fontSize: '25px',color:'white',textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}>
                        돈가스</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink 
                        activeclassname = "active"
                        className="nav-link" 
                        aria-current="page" 
                        to="/user/menu/5"
                        style={{ textDecoration: 'none',fontFamily: 'SansM',fontSize: '25px',color:'white',textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}>
                        사이드</NavLink>
                    </li>
                </ul> 
            </div>
        </nav>
    );
};

export default UserNavBar;