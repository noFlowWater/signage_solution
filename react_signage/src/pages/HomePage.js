import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [paddingTopRatio, setPaddingTopRatio] = useState(0.12);

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.removeItem('userId');
      localStorage.removeItem('userCart');
      localStorage.removeItem('total');
      localStorage.removeItem('userAl');
    };

    clearLocalStorage(); 
  }, [paddingTopRatio]); 

  // 화면 크기에 따른 픽셀 값 계산
  const calculateSize = (originalSize, ratio) => {
    return Math.round(window.innerWidth * ratio) || originalSize;
  };

  return (
    <div style={{ backgroundImage: `url(${require('../img/HomeBG.png')})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh', overflow: 'hidden',paddingTop: 'px'}}>
      <div className="container d-flex align-items-center justify-content-center vh-50">
        <div className="d-flex flex-column align-items-center">
          <div className="logo-container" style={{ width: calculateSize(720, 0.52), height: calculateSize(220, 0.3) }}>
            <img src={require('../img/Logo.png')} alt="Logo" className="logo-image" />
          </div>

          <div>
            <div className="logo-container" style={{ width: calculateSize(613, 0.45), height: calculateSize(130, 0.05) }}>
              <Link to="/user/mode" style={{ textDecoration: 'none' }}>
                <button type="button" style={{ background: 'transparent', border: 'none'}}>
                  <img src={require('../img/StartBtn.png')} alt="" className="logo-image"/>
                </button>
              </Link>
            </div>
          </div>

          <div>
            <div className="logo-container" style={{ width: calculateSize(143, 0.2), height: calculateSize(40, 0.2) }}>
              <Link to="/admin/login" style={{ textDecoration: 'none' }}>
                <button type="button" style={{ background: 'transparent', border: 'none' }}>
                  <img src={require('../img/AdminBtn.png')} alt="" className="logo-image"/>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;