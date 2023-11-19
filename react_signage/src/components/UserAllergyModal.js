import { useState } from 'react';
import styled from 'styled-components';

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
  width: 500px;
  height: 400px;
  background-color: #ffffff;
  > div.desc {
    margin: 50px;
    font-size: 20px;
    color: var(--coz-purple-600);
  }
`;

export const ModalIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const ModalIcon = styled.img`
  width: 60px;
  height: 73px;
  margin: 10px;
  cursor: pointer;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.5)};
`;

export const UserAllergyModal = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcons, setSelectedIcons] = useState([]);

  const openModalHandler = () => {
    setIsOpen(true);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
    setSelectedIcons([]);
  };

  const selectIconHandler = (iconName) => {
    if (selectedIcons.includes(iconName)) {
      setSelectedIcons(selectedIcons.filter((icon) => icon !== iconName));
    } else {
      setSelectedIcons([...selectedIcons, iconName]);
    }
  };

  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}>알러지를 선택해주세요</ModalBtn>
        {isOpen ? (
          <ModalBackdrop onClick={closeModalHandler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <ExitBtn onClick={closeModalHandler}>x</ExitBtn>
              <div className='desc'>{content}</div>
              <ModalIconContainer>
                <ModalIcon
                  src='/img/a1.png'
                  alt='Icon 1'
                  isSelected={selectedIcons.includes('호두')}
                  onClick={() => selectIconHandler('호두')}
                />
                <ModalIcon
                  src='/img/a2.png'
                  alt='Icon 2'
                  isSelected={selectedIcons.includes('메밀')}
                  onClick={() => selectIconHandler('메밀')}
                />
                <ModalIcon
                  src='/img/a3.png'
                  alt='Icon 3'
                  isSelected={selectedIcons.includes('밀')}
                  onClick={() => selectIconHandler('밀')}
                />
                <ModalIcon
                  src='/img/a4.png'
                  alt='Icon 4'
                  isSelected={selectedIcons.includes('대두')}
                  onClick={() => selectIconHandler('대두')}
                />
              </ModalIconContainer>
              <div>선택한 알러지 정보: {selectedIcons.join(', ')}</div>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};

export default UserAllergyModal;