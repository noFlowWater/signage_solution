import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [paddingTopRatio, setPaddingTopRatio] = useState(0.12); // 화면 높이의 30%로 설정

  // 컴포넌트가 마운트될 때와 화면 크기가 변경될 때 이벤트 리스너 등록
  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.removeItem('userId');
      localStorage.removeItem('userCart');
      localStorage.removeItem('total');
      localStorage.removeItem('userAl');
    };

    clearLocalStorage(); // 컴포넌트가 마운트될 때 localStorage 비우기
  }, [paddingTopRatio]); // 원래 의존성 배열 : paddingTopRatio 인데 []로 테스팅 해볼 것

  return (
    <div style={{ backgroundImage: `url(${require('../img/HomeBG.png')})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh', overflow: 'hidden',paddingTop: '120px'}}>
      <div className="container d-flex align-items-center justify-content-center vh-50">
        <div className="d-flex flex-column align-items-center">
          <div className="logo-container" style={{ width: '720px', height: '220px' }}>
            <img src={require('../img/Logo.png')} alt="Logo" className="logo-image" />
          </div>

          <div style={{ paddingTop: '40px' }}>
            <div className="logo-container" style={{ width: '613px', height: '130px' }}>
              <Link to="/user/mode" style={{ textDecoration: 'none' }}>
                <button type="button" style={{ background: 'transparent', border: 'none', paddingTop: '30px' }}>
                  <img src={require('../img/StartBtn.png')} alt="" className="logo-image"/>
                </button>
              </Link>
            </div>
          </div>

          <div style={{ paddingTop: '80px' }}>
            <div className="logo-container" style={{ width: '143px', height: '40px' }}>
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
