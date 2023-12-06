import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [paddingTopRatio, setPaddingTopRatio] = useState(0.12); // 화면 높이의 30%로 설정
  
  // 화면 크기가 변경될 때 paddingTop 비율을 업데이트하는 함수
  const handleResize = () => {
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const paddingTopValue = screenHeight * paddingTopRatio;
    document.documentElement.style.setProperty('--padding-top', `${paddingTopValue}px`);
  };

  // 컴포넌트가 마운트될 때와 화면 크기가 변경될 때 이벤트 리스너 등록
  useEffect(() => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userCart');
    localStorage.removeItem('total');
    
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const paddingTopValue = screenHeight * paddingTopRatio;
    document.documentElement.style.setProperty('--padding-top', `${paddingTopValue}px`);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [paddingTopRatio]);

  return (
    <div style={{ backgroundImage: `url(${require('../img/HomeBG.png')})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh', overflow: 'hidden',paddingTop: 'var(--padding-top)'}}>
      <div className="container d-flex align-items-center justify-content-center vh-50">
        <div className="d-flex flex-column align-items-center">
          <div className="logo-container" style={{ '--logo-width': '720px', '--logo-height': '220px' }}>
            <img src={require('../img/Logo.png')} alt="Logo" className="logo-image" />
          </div>

          <div style={{ paddingTop: 'var(--padding-top)' }}>
            <div className="logo-container" style={{ '--logo-width': '613px', '--logo-height': '130px' }}>
              <Link to="/user/mode" style={{ textDecoration: 'none' }}>
                <button type="button" style={{ background: 'transparent', border: 'none', paddingTop: '30px' }}>
                  <img src={require('../img/StartBtn.png')} alt="" className="logo-image"/>
                </button>
              </Link>
            </div>
          </div>

          <div style={{ paddingTop: 'var(--padding-top)' }}>
            <div className="logo-container" style={{ '--logo-width': '143px', '--logo-height': '40px' }}>
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
