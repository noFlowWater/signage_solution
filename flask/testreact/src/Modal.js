import { useState } from 'react';
import styled from 'styled-components';

export const ModalContainer = styled.div;
export const ModalBackdrop = styled.div;
export const ModalBtn = styled.button;
export const ExitBtn = styled(ModalBtn);
export const ModalView = styled.div.attrs((props) => ({
    // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
    role: 'dialog',
    }));

  export const Modal = ({title,content}) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const openModalHandler = () => {
      // isOpen의 상태를 변경하는 메소드를 구현
      // !false -> !true -> !false
      setIsOpen(!isOpen) 
    };
  
    return (
      <>
        <ModalContainer>
          <ModalBtn onClick={openModalHandler}
          // 클릭하면 Modal이 열린 상태(isOpen)를 boolean 타입으로 변경하는 메소드가 실행되어야 합니다. 
          > {title}
            {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때는 ModalBtn의 내부 텍스트가 'Opened!' 로 Modal이 닫힌 상태(isOpen이 false인 상태)일 때는 ModalBtn 의 내부 텍스트가 'Open Modal'이 되도록 구현 */}
          </ModalBtn>
          {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때만 모달창과 배경이 뜰 수 있게 구현 */}
          {isOpen ? 
          <ModalBackdrop onClick={openModalHandler}>
              <ModalView onClick={(e) => e.stopPropagation()}>
                <ExitBtn onClick={openModalHandler}>x</ExitBtn>
                <div className='desc'>{content}</div>
              </ModalView>
            </ModalBackdrop>
            : null
          }
        </ModalContainer>
      </>
    );
  };