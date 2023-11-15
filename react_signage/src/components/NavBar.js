import {Link,NavLink} from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar bg-transparent">
            <div className="container">
                <Link className="navbar-brand" to="/">Home</Link>
            </div>
        </nav>
    );
};

export default NavBar;