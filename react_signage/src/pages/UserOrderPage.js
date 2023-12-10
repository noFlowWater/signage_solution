import UserOrderNavBar from "../components/UserOrderNavBar";
import { useState,useEffect } from 'react';
import styled from "styled-components";
import { UserPayModal } from "../components/UserPayModal";
import UserCartCheck from "../components/UserCartCheck";

const DineInButton = styled.button`
  background-color: ${props => props.active ? '#FF4B4B' : '#FAFFFD'};
  color: ${props => props.active ? 'white' : 'black'};
  padding: 20px 60px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 5); /* 버튼에 그림자 효과 적용 */
`;

const ToGoButton = styled.button`
  background-color: ${props => props.active ? '#FF4B4B' : '#FAFFFD'};
  color: ${props => props.active ? 'white' : 'black'};
  padding: 20px 60px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 5); /* 버튼에 그림자 효과 적용 */
`;

const UserOrderPage = () => {
    const [isDineIn, setIsDineIn] = useState(true); // 매장 버튼의 상태
    const [isTakeOut, setIsTakeOut] = useState(false); // 포장 버튼의 상태
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [total, setTotal] = useState('');

    useEffect(() => {
        const totalAmount = localStorage.getItem('total');
        setTotal(totalAmount);
    }, []);

    const handleDineIn = () => {
        setIsDineIn(true);
        setIsTakeOut(false);
    };

    const handleTakeOut = () => {
        setIsDineIn(false);
        setIsTakeOut(true);
    };

    return (
        <div>
            <UserOrderNavBar />
            <div style={{ display: 'flex', paddingTop: '15px' }}>
                <div style={{ flex: 4, borderRight: '2px solid black', backgroundColor: '#f8f8f8' }}>
                    <UserCartCheck />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e8e8e8' }}>
                    <div style={{paddingTop :'15px'}}>
                        <DineInButton style={{ fontSize: '25px' }} active={isDineIn} onClick={handleDineIn}>
                            <div style={{ fontFamily: 'SansM' }}>매장</div>
                        </DineInButton>
                    </div>
                    <hr style={{ borderTop: '1px solid black', width: '100%' }} />
                    <ToGoButton style={{ fontSize: '25px' }} active={isTakeOut} onClick={handleTakeOut}>
                        <div style={{ fontFamily: 'SansM' }}>포장</div>
                    </ToGoButton>
                    <hr style={{ borderTop: '1px solid black', width: '100%' }} />
                    <div style={{ paddingLeft: '10px', fontFamily: 'SansB', fontSize: '20px' }}>
                        TOTAL : {total}
                    </div>
                    <hr style={{ borderTop: '1px solid black', width: '100%' }} />
                        <UserPayModal content="결제가 완료되었습니다 :)"/>
                </div>
            </div>
        </div>
    );
}

export default UserOrderPage;
