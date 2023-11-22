import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 170px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px; /* 버튼 간의 여백 설정 */
`;

const LeftButton = styled.button`
  background-color: #80CC34;
  color: white;
  padding: 50px 100px;
  border-radius: 20px;
  margin-right: auto; /* 오른쪽 마진을 auto로 설정하여 가운데 정렬 */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 5); /* 버튼에 그림자 효과 적용 */
`;

const RightButton = styled.button`
  background-color: #FF4B4B;
  color: white;
  padding: 50px 100px;
  border-radius: 20px;
  margin-left: auto; /* 오른쪽 마진을 auto로 설정하여 가운데 정렬 */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 5); /* 버튼에 그림자 효과 적용 */
`;

const UserModeSelectPage = () => {
  return (
    <div style={{ backgroundImage: `url(${require('../img/UserModeBG.png')})`, backgroundSize: 'cover', backgroundPosition: 'center',width: '100vw', height: '100vh'}}>
        <PageContainer>
            <ButtonContainer>
            <div style={{ fontFamily: 'SansM',fontSize: '50px' }}>첫 방문이라면</div>
            <Link className="user-reg" to="/user/reg">
                <LeftButton style={{fontSize:'50px'}}>
                    <div style={{fontFamily: 'SansM'}}>사용자 등록</div>
                </LeftButton>
            </Link>
            </ButtonContainer>
            
            <ButtonContainer>
            <div style={{ fontFamily: 'SansM',fontSize: '50px' }}>이미 등록되어있다면</div>
                <Link className="user-face" to="/user/face">
                    <RightButton style={{fontSize:'50px'}}> 
                    <div style={{fontFamily: 'SansM'}}>사용자 인증</div>
                    </RightButton>
                </Link>
            </ButtonContainer>
        </PageContainer>
    </div>
  );
};

export default UserModeSelectPage;