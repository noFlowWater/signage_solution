import UserOrderNavBar from "../components/UserOrderNavBar";
import { useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

const DineInButton = styled.button`
  background-color: ${props => props.active ? '#FF4B4B' : '#FAFFFD'};
  color: black;
  padding: 20px 60px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 5); /* 버튼에 그림자 효과 적용 */
`;

const ToGoButton = styled.button`
  background-color: ${props => props.active ? '#FF4B4B' : '#FAFFFD'};
  color: black;
  padding: 20px 60px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 5); /* 버튼에 그림자 효과 적용 */
`;

const UserOrderPage = () => {
    const [isDineIn, setIsDineIn] = useState(true); // 매장 버튼의 상태
    const [isTakeOut, setIsTakeOut] = useState(false); // 포장 버튼의 상태

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
                    장바구니 내역
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e8e8e8' }}>
                    <DineInButton style={{ fontSize: '25px' }} active={isDineIn} onClick={handleDineIn}>
                        <div style={{ fontFamily: 'SansM' }}>매장</div>
                    </DineInButton>
                    <ToGoButton style={{ fontSize: '25px' }} active={isTakeOut} onClick={handleTakeOut}>
                        <div style={{ fontFamily: 'SansM' }}>포장</div>
                    </ToGoButton>
                    <hr style={{ borderTop: '1px solid black', width: '100%' }} />
                    <div style={{ paddingLeft: '10px', fontFamily: 'SansB', fontSize: '20px' }}>
                        TOTAL :
                    </div>
                    <hr style={{ borderTop: '1px solid black', width: '100%' }} />
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <button type="button" style={{ background: 'transparent', border: 'none', paddingTop: '30px' }}>
                            <img src={require('../img/PayBtn.png')} alt="Pay" className="pay-image" style={{ width: '200px', height: 'auto' }} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default UserOrderPage;
