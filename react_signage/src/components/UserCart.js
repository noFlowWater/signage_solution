import { useContext, useState,useEffect,useCallback } from 'react';
import { CartContext } from './UserCartContext';
import axios from 'axios';
import { kiosk } from '../constants';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const OrderButton = styled.button`
  background-color: #FF4B4B;
  color: white;
  padding: 10px 55px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5); /* 버튼에 그림자 효과 적용 */
`;

const UserCart = () => {
    const { cart, dispatch } = useContext(CartContext);
    const [isOrdering, setIsOrdering] = useState(false);

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

    // const handleOrder = async () => {
    //     try {
    //         setIsOrdering(true);
    //         const orderData = {
    //             user_id: localStorage.getItem('userId'),
    //             orders: cart.map(item => ({
    //                 menu_id: item.menu_id,
    //                 order_count: item.quantity,
    //             })),
    //         };
    //         console.log(orderData);
    //         await axios.post(`${kiosk}/users/order`, JSON.stringify(orderData), {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         dispatch({ type: 'CLEAR_CART' });
    //         setIsOrdering(false);
    //     } catch (error) {
    //         console.log(error);
    //         setIsOrdering(false);
    //     }
    // };

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
        <div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <div style={{ paddingTop: '15px' }}>
                    <img src={require('../img/CartBtn.png')} alt="Cart" height="75" width="215" />
                </div>
            </div>
            {cart.map((item, index) => (
                <div key={index}>
                    <h1>{item.menu_name}</h1>
                    <p>{item.price}</p>
                    <div>
                        <button onClick={() => handleDecrease(item)}>-</button>
                        수량: {calculateQuantity(item)}
                        <button onClick={() => handleIncrease(item)}>+</button>
                        <div><button onClick={() => handleRemove(item)}>X</button></div>
                    </div>
                </div>
            ))}
            <hr style={{ borderTop: '1px solid black', width: '100%' }} />
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <div style={{ fontFamily: 'SansB', fontSize: '20px' }}>
                    TOTAL: {calculateTotal()} {/* 총 금액 표시 */}
                </div>
                <hr style={{ borderTop: '1px solid black', width: '100%' }} />
                <div style={{ fontFamily: 'SansM'}}>
                    <Link to="/user/order">
                        <OrderButton style={{ fontSize: '23px' }}>
                            <div style={{ fontFamily: 'SansM' }}>주문하기</div>
                        </OrderButton>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default UserCart;
