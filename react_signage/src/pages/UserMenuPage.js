import React, { useReducer } from 'react';
import UserNavBar from "../components/UserNavBar";
import UserMenu from '../components/UserMenu';
import UserCart from "../components/UserCart";
import { CartContext, cartReducer } from '../components/UserCartContext'; 

const UserMenuPage = () => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            <div>
                <UserNavBar />
                <div style={{ display: 'flex', paddingTop: '10px'}}>
                    <div style={{ flex: 4, backgroundColor: 'white' }}>
                        <UserMenu />
                    </div>
                    <div style={{ flex: 1, backgroundColor: 'white',paddingRight:'15px',paddingTop:'10px' }}>
                        <div style={{ backgroundColor: '#e8e8e8', borderRadius: '20px', boxShadow: "0px 4px 10px rgba(0, 0, 0, 5)"}}>
                            <UserCart />
                        </div>
                    </div>
                </div>
            </div>
        </CartContext.Provider>
    )
}

export default UserMenuPage;
