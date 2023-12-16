import { useContext,useEffect,useCallback } from 'react';
import { CartContext } from './UserCartContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const OrderButton = styled.button`
  background-color: #FF4B4B;
  color: white;
  padding: 10px 55px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 5); /* 버튼에 그림자 효과 적용 */
`;

const UserCart = () => {
    const { cart, dispatch } = useContext(CartContext);

    const calculateQuantity = (menu) => {
        const count = cart.reduce((total, item) => {
            if (item.menu_name === menu.menu_name) {
                return total + item.quantity;
            }
            return total;
        }, 0);
        return count;
    };

    const handleDecrease = (menu) => {
        const existingItem = cart.find(item => item.menu_name === menu.menu_name);
        if (existingItem) {
            if (existingItem.quantity > 1) {
                dispatch({ type: 'DECREASE_QUANTITY', menuName: menu.menu_name });
            }
        }
    };

    const handleIncrease = (menu) => {
        const existingItem = cart.find(item => item.menu_name === menu.menu_name);
        if (existingItem) {
            if (existingItem.quantity >= 1) {
                dispatch({ type: 'INCREASE_QUANTITY', menuName: menu.menu_name });
            }
        }
    };

    const handleRemove = (menu) => {
        dispatch({ type: 'REMOVE_MENU', menuName: menu.menu_name });
    };

    useEffect(() => {
        localStorage.setItem('userCart', JSON.stringify(cart));
    }, [cart]);

    const calculateTotal = useCallback(() => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('total', calculateTotal().toString());
    }, [cart,calculateTotal]);


    return (
        <div >
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <div style={{ paddingTop: '15px' }}>
                    <img src={require('../img/CartBtn.png')} alt="Cart" height="75" width="215" />
                </div>
            </div>

            {/* 흰색 박스로 구분 */}
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {cart.map((item, index) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div key={index} style={{ backgroundColor: "#f8f8f8", padding: "10px", marginBottom: "10px", borderRadius: "15px", width: "90%", height: "100%", boxShadow: "0px 4px 10px rgba(0, 0, 0, 5)" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ fontFamily: "SansB", fontSize: "20px", marginRight: "10px" }}>{item.menu_name}</div>
                                <button onClick={() => handleRemove(item)} style={{background: 'white',color:'#FF4B4B',width:'30px',height:'30px',borderRadius:'5px',boxShadow: "0px 2px 5px rgba(0, 0, 0, 1)"}}>X</button>
                            </div>

                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <div style={{ fontFamily: "SansM", fontSize: "15px" }}>￦{item.price}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <button onClick={() => handleDecrease(item)} style={{background: 'white',color:'#FF4B4B',width:'30px',height:'30px',borderRadius:'5px',boxShadow: "0px 2px 5px rgba(0, 0, 0, 1)"}}>-</button>
                                    <div style={{ fontFamily: "SansM", fontSize: "15px",paddingLeft:'10px',paddingRight:'10px' }}>
                                        수량: {calculateQuantity(item)}
                                    </div>
                                    <button onClick={() => handleIncrease(item)} style={{background: 'white',color:'#FF4B4B',width:'30px',height:'30px',borderRadius:'5px',boxShadow: "0px 2px 5px rgba(0, 0, 0, 1)"}}>+</button>
                                </div>
                            </div>
                    </div>
                </div>
            ))}
            </div>
            
            <hr style={{ borderTop: '1px solid black', width: '100%' }} />
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <div style={{ fontFamily: 'SansB', fontSize: '20px' }}>
                    합계: ￦ {calculateTotal()} {/* 총 금액 표시 */}
                </div>
                <hr style={{ borderTop: '1px solid black', width: '100%' }} />
                <div style={{ fontFamily: 'SansM'}}>
                    {/* <Link to="/user/order">
                        <OrderButton style={{ fontSize: '23px' }}>
                            <div style={{ fontFamily: 'SansM' }}>주문하기</div>
                        </OrderButton>
                    </Link> */}
                    <Link to="/user/order">
                        {cart.length > 0 ? (
                            <div style={{paddingBottom:'15px'}}>
                                <OrderButton style={{ fontSize: '23px'}}>
                                    <div style={{ fontFamily: 'SansM' }}>주문하기</div>
                                </OrderButton>
                            </div>
                        ) : (
                            <div style={{paddingBottom:'15px'}}>
                                <OrderButton style={{ fontSize: '23px', cursor: 'not-allowed'}} disabled>
                                    <div style={{ fontFamily: 'SansM' }}>주문하기</div>
                                </OrderButton>
                            </div>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default UserCart;
