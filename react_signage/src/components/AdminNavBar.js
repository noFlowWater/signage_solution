import { NavLink, useNavigate } from "react-router-dom";

const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/");
  };

  return (
    <nav className="navbar navbar" style={{ borderBottom: '2px solid #ddd' }}>
      <div className="container d-flex justify-content-between align-items-center">
        <ul className="nav">
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="btn"
              to="/admin/changepw"
              aria-current="page"
              style={{
                textDecoration: 'none',
                fontFamily: 'SansM',
                fontSize: '15px',
                background: 'transparent',
                border: 'none',
                // boxShadow: '0px 4px 10px rgba(0,0,0,5)'
              }}>
              비밀번호 변경
            </NavLink>
          </li>
        </ul>
        <div className="logo-container d-flex justify-content-center align-items-center">
          <img
            src={require('../img/Logo.png')}
            alt="logo"
            height="100"
            width="300"
            onClick={handleClickLogo}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <ul className="nav">
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="btn btn-danger"
              aria-current="page"
              to="/admin/menu/reg"
              style={{
                textDecoration: 'none',
                fontFamily: 'SansM',
                fontSize: '20px',
                boxShadow: '0px 4px 10px rgba(0,0,0,5)'
              }}>
              메뉴 등록
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavBar;
