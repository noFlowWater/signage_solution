import { useContext, useState } from 'react';
import { CartContext } from './UserCartContext';
import axios from 'axios';
import { kiosk } from '../constants';
import { Link } from 'react-router-dom';

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

    const handleOrder = async () => {
        try {
            setIsOrdering(true);
            const orderData = {
                user_id: '1',
                orders: cart.map(item => ({
                    menu_id: item.menu_id,
                    order_count: item.quantity,
                })),
            };
            console.log(orderData);
            await axios.post(`${kiosk}/order`, JSON.stringify(orderData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            dispatch({ type: 'CLEAR_CART' });
            setIsOrdering(false);
        } catch (error) {
            console.log(error);
            setIsOrdering(false);
        }
    };

    const calculateTotal = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    };

    return (
        <div>
            <div style={{ paddingTop: '15px', paddingLeft: '5px' }}>
                <img src={require('../img/CartBtn.png')} alt="Cart" height="65" width="180" />
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
            <div style={{ paddingLeft: '10px', fontFamily: 'SansB', fontSize: '20px' }}>
                TOTAL: {calculateTotal()} {/* 총 금액 표시 */}
            </div>
            <div style={{paddingLeft: '10px',fontFamily: 'SansM',fontSize: '20px'}}>
                <Link to="/user/order" style={{ textDecoration: 'none'}}>
                <button className="btn mt-5" onClick={handleOrder} disabled={isOrdering} style={{ backgroundColor: '#FF4B4B', color: 'white' }}>
                    {isOrdering ? '주문 중...' : '주문하기'}
                </button>
                </Link>
            </div>
        </div>
    );
}

export default UserCart;
