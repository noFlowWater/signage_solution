import { useState } from 'react';
import styled from 'styled-components';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { kiosk } from '../constants';

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ModalBackdrop = styled.div`
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  padding: 20px;
  color: black;
  border-radius: 30px;
  cursor: grab;
`;

// export const ExitBtn = styled(ModalBtn)`
//   background-color: #4000c7;
//   border-radius: 10px;
//   text-decoration: none;
//   margin: 15px;
//   padding: 5px 10px;
//   width: 40px;
//   height: 40px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

export const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px;
  width: 500px;
  height: 200px;
  background-color: #ffffff;
  > div.desc {
    margin: 20px;
    font-size: 20px;
    color: var(--coz-purple-600);
  }
`;

export const UserPayModal = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const handleConfirm = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const userCart = localStorage.getItem('userCart');
  
      if (userId && userCart) {
        const orderData = {
          user_id: userId,
          orders: JSON.parse(userCart).map(item => ({
            menu_id: item.menu_id,
            order_count: item.quantity,
          })),
        };
  
        await axios.post(`${kiosk}/users/order`, JSON.stringify(orderData), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // // 서버로 전송 후에 필요한 처리를 추가해주세요 (예: 카트 비우기)
        // dispatch({ type: 'CLEAR_CART' });
      }
      console.log("주문 내역 전송 완료")
  
      // 로컬 스토리지의 모든 값 삭제
      localStorage.removeItem('userId');
      localStorage.removeItem('userCart');
      localStorage.removeItem('total');
      console.log("로컬 스토리지 비움 완료")

      // 페이지 이동 및 리렌더링
      navigate("/");
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}>
          {/* Display the image instead of the title */}
          <img src={require('../img/PayBtn.png')} alt="Pay" className="pay-image" style={{ width: '200px', height: 'auto' }} />
        </ModalBtn>
        {isOpen ? (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <img src={require('../img/Logo.png')} alt="Pay" className="pay-image" style={{ width: '150px', height: 'auto' }} />
              <div className='desc' style={{ fontFamily: 'SansM', fontSize: '20px' }}>{content}</div>
                <button className="btn btn-primary" onClick={handleConfirm}>
                  확인
                </button>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};
