import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { kiosk } from '../constants';
import { useNavigate } from 'react-router-dom';

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
  padding: 10px;
  color: blue;
  border-radius: 30px;
  cursor: grab;
  font-family: 'SansM'; /* 원하는 폰트 패밀리를 지정합니다. */
  font-size: 20px; /* 원하는 폰트 크기를 지정합니다. */
`;


export const ExitBtn = styled(ModalBtn)`
  background-color: #4000c7;
  border-radius: 10px;
  text-decoration: none;
  margin: 10px;
  padding: 5px 10px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 600px;
  height: 730px;
  background-color: #EBF6EE;
  > div.desc {
    margin: 20px;
    font-size: 20px;
    color: var(--coz-purple-600);
  }
`;

export const ModalIconContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  justify-items: center;
  align-items: center;
  flex-wrap: wrap;
`;


export const ModalIcon = styled.img`
  width: 75px;
  height: 70px;
  margin: 10px;
  cursor: pointer;
  opacity: ${({ 'data-isselected': isSelected }) => (isSelected ? 1 : 0.5)};
`;


export const UserAllergyModal = ({ content, isOpen, setIsOpen,userId }) => {
  const [selectedIcons, setSelectedIcons] = useState([]);
  const navigate = useNavigate();

  // 모달 상태를 내부에서 관리하는 대신 props로 받음
  useEffect(() => {
      setIsOpen(isOpen); // 외부 상태에 따라 모달 상태 설정
  }, [isOpen, setIsOpen]);


  const selectIconHandler = (iconName) => {
    if (selectedIcons.includes(iconName)) {
      setSelectedIcons(selectedIcons.filter((icon) => icon !== iconName));
    } else {
      setSelectedIcons([...selectedIcons, iconName]);
    }
  };

  const sendSelectedIconsToServer = () => {
    const user_id = userId
    const allergies = selectedIcons
    const data = JSON.stringify({ user_id, allergies });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    axios.post(`${kiosk}/users`, data, config)
      .then(response => {
        // 서버로부터의 응답 처리
        console.log(response.data);
      })
      .catch(error => {
        // 에러 처리
        console.error(error);
      });

      navigate('/');
  };

  return (
    <>
      {isOpen && (
        <ModalContainer>
          <ModalBackdrop>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <div className='desc' style = {{fontFamily: 'SansM',fontSize: '20px'}}>{content}</div>
              <ModalIconContainer>
                <ModalIcon
                  src={require('../img/게.png')}
                  alt='게'
                  data-isselected={selectedIcons.includes('게')}
                  onClick={() => selectIconHandler('게')}
                />
                <ModalIcon
                  src={require('../img/고등어.png')}
                  alt='고등어'
                  data-isselected={selectedIcons.includes('고등어')}
                  onClick={() => selectIconHandler('고등어')}
                />
                <ModalIcon
                  src={require('../img/굴.png')}
                  alt='굴'
                  data-isselected={selectedIcons.includes('굴')}
                  onClick={() => selectIconHandler('굴')}
                />
                <ModalIcon
                  src={require('../img/난류(가금류).png')}
                  alt='난류(가금류)'
                  data-isselected={selectedIcons.includes('난류(가금류)')}
                  onClick={() => selectIconHandler('난류(가금류)')}
                />
        
                <ModalIcon
                  src={require('../img/닭고기.png')}
                  alt='닭고기'
                  data-isselected={selectedIcons.includes('닭고기')}
                  onClick={() => selectIconHandler('닭고기')}
                />
                <ModalIcon
                  src={require('../img/대두.png')}
                  alt='대두'
                  data-isselected={selectedIcons.includes('대두')}
                  onClick={() => selectIconHandler('대두')}
                />
                <ModalIcon
                  src={require('../img/돼지고기.png')}
                  alt='돼지고기'
                  data-isselected={selectedIcons.includes('돼지고기')}
                  onClick={() => selectIconHandler('돼지고기')}
                />
                <ModalIcon
                  src={require('../img/땅콩.png')}
                  alt='땅콩'
                  data-isselected={selectedIcons.includes('땅콩')}
                  onClick={() => selectIconHandler('땅콩')}
                />

                <ModalIcon
                  src={require('../img/메밀.png')}
                  alt='메밀'
                  data-isselected={selectedIcons.includes('메밀')}
                  onClick={() => selectIconHandler('메밀')}
                />
                <ModalIcon
                  src={require('../img/밀.png')}
                  alt='밀'
                  data-isselected={selectedIcons.includes('밀')}
                  onClick={() => selectIconHandler('밀')}
                />
                <ModalIcon
                  src={require('../img/복숭아.png')}
                  alt='복숭아'
                  data-isselected={selectedIcons.includes('복숭아')}
                  onClick={() => selectIconHandler('복숭아')}
                />
                <ModalIcon
                  src={require('../img/새우.png')}
                  alt='새우'
                  data-isselected={selectedIcons.includes('새우')}
                  onClick={() => selectIconHandler('새우')}
                />
      


                <ModalIcon
                  src={require('../img/쇠고기.png')}
                  alt='쇠고기'
                  data-isselected={selectedIcons.includes('쇠고기')}
                  onClick={() => selectIconHandler('쇠고기')}
                />
                <ModalIcon
                  src={require('../img/아황산류.png')}
                  alt='아황산류'
                  data-isselected={selectedIcons.includes('아황산 포함식품')}
                  onClick={() => selectIconHandler('아황산 포함식품')}
                />
                <ModalIcon
                  src={require('../img/오징어.png')}
                  alt='오징어'
                  data-isselected={selectedIcons.includes('오징어')}
                  onClick={() => selectIconHandler('오징어')}
                />
                <ModalIcon
                  src={require('../img/우유.png')}
                  alt='우유'
                  data-isselected={selectedIcons.includes('우유')}
                  onClick={() => selectIconHandler('우유')}
                />
    

           
                <ModalIcon
                  src={require('../img/잣.png')}
                  alt='잣'
                  data-isselected={selectedIcons.includes('잣')}
                  onClick={() => selectIconHandler('잣')}
                />
                <ModalIcon
                  src={require('../img/전복.png')}
                  alt='전복'
                  data-isselected={selectedIcons.includes('전복')}
                  onClick={() => selectIconHandler('전복')}
                />
                <ModalIcon
                  src={require('../img/조개류.png')}
                  alt='조개류'
                  data-isselected={selectedIcons.includes('조개류')}
                  onClick={() => selectIconHandler('조개류')}
                />
                <ModalIcon
                  src={require('../img/토마토.png')}
                  alt='토마토'
                  data-isselected={selectedIcons.includes('토마토')}
                  onClick={() => selectIconHandler('토마토')}
                />
       

          
                <ModalIcon
                  src={require('../img/호두.png')}
                  alt='호두'
                  data-isselected={selectedIcons.includes('호두')}
                  onClick={() => selectIconHandler('호두')}
                />
                <ModalIcon
                  src={require('../img/홍합.png')}
                  alt='홍합'
                  data-isselected={selectedIcons.includes('홍합')}
                  onClick={() => selectIconHandler('홍합')}
                />
        
                
              </ModalIconContainer>
              <div style={{fontFamily: 'SansM',fontSize: '15px' }}>선택한 알러지 정보 :</div> 
              <div style={{ fontFamily: 'SansM',fontSize: '15px' }}>{selectedIcons.join('/')}</div>
              <ModalBtn onClick={sendSelectedIconsToServer}>선택 완료</ModalBtn>
            </ModalView>
          </ModalBackdrop>
        </ModalContainer>
        )}
    </>
  );
};

export default UserAllergyModal;
