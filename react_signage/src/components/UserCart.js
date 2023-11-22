import { useContext } from 'react';
import { CartContext } from './UserCartContext';

const UserCart = () => {
    const { cart } = useContext(CartContext);

    return (
        <div>
            <div style = {{paddingTop: '15px',paddingLeft: '5px'}}>
                <img src={require('../img/CartBtn.png')} alt="Cart" height="60" width="170"/>
            </div>
            {cart.map((item, index) => (
                <div key={index}>
                    <h1>{item.name}</h1>
                    <p>{item.price}</p>
                </div>
            ))}
        </div>
    );
}

export default UserCart;