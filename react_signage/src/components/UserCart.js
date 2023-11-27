import { useContext, useState } from 'react';
import { CartContext } from './UserCartContext';
import axios from 'axios';
import { kiosk } from '../constants';

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

    const handleOrder = async () => {
        try {
            setIsOrdering(true);
            // const orderData = cart.map(item => {
            //     console.log(item); // item 값을 콘솔 창에 출력
            //     return {
            //         menu_name: item.menu_name,
            //         quantity: item.quantity,
            //     };
            // });
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

    return (
        <div>
            <div style={{ paddingTop: '15px', paddingLeft: '5px' }}>
                <img src={require('../img/CartBtn.png')} alt="Cart" height="65" width="180" />
            </div>
            {cart.map((item, index) => (
                <div key={index}>
                    <h1>{item.menu_name}</h1>
                    <p>{item.price}</p>
                    <p>수량: {calculateQuantity(item)}</p>
                </div>
            ))}
            <button onClick={handleOrder} disabled={isOrdering}>
                {isOrdering ? '주문 중...' : '주문하기'}
            </button>
        </div>
    );
}

export default UserCart;
