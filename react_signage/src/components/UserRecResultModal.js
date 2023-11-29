import { useState, useEffect } from 'react';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display : flex;
  justify-content : center;
  align-items : center;
  height : 100%;
`;

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
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

export const ExitBtn = styled(ModalBtn) `
    background-color : #4000c7;
    border-radius: 10px;
    text-decoration: none;
    margin: 10px;
    padding: 5px 10px;
    width: 40px;
    height: 40px;
    display : flex;
    justify-content : center;
    align-items : center;
`;

export const ModalView = styled.div.attrs((props) => ({
    // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
    role: 'dialog',
    }))`
    // Modal창 CSS를 구현합니다.
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    width: 500px;
    heigth: 200px;
    background-color: #ffffff;
      >div.desc {
        margin: 50px;
        font-size: 20px;
        color: var(--coz-purple-600);
      }
  `;

export const ModalButton = styled.button`
    background-color: #4CAF50; // 예시 색상
    color: white;
    padding: 10px 15px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #45a049;
    }
  `;

export const UserRecResultModal = ({ 
    content, 
    isOpen, 
    setIsOpen, 
    onYes,        // 부모 컴포넌트에서 정의된 함수
    onAlternative,// 부모 컴포넌트에서 정의된 함수
    onHome,       // 부모 컴포넌트에서 정의된 함수
    onRetry       // 부모 컴포넌트에서 정의된 함수
}) => {
    // 모달 상태를 내부에서 관리하는 대신 props로 받음
    useEffect(() => {
        setIsOpen(isOpen); // 외부 상태에 따라 모달 상태 설정
    }, [isOpen, setIsOpen]);
    return (
        <>
            {isOpen && 
                <ModalContainer>
                    <ModalBackdrop>
                        <ModalView onClick={(e) => e.stopPropagation()}>
                            {/* ExitBtn 컴포넌트를 제거했습니다. */}
                            <div className='desc'>{content}</div>
                            <div>
                                <ModalButton onClick={onYes}>YES</ModalButton>
                                <ModalButton onClick={onAlternative}>대체인증</ModalButton>
                                <ModalButton onClick={onHome}>HOME</ModalButton>
                                <ModalButton onClick={onRetry}>RETRY</ModalButton>
                            </div>
                        </ModalView>
                    </ModalBackdrop>
                </ModalContainer>
            }
        </>
    );
};

export default UserRecResultModal;
