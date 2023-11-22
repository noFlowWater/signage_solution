// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
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
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 4, borderRight: '2px solid black', backgroundColor: '#f8f8f8' }}>
                        <UserMenu />
                    </div>
                    <div style={{ flex: 1, backgroundColor: '#e8e8e8' }}>
                        <UserCart />
                    </div>
                </div>
            </div>
        </CartContext.Provider>
    )
}

export default UserMenuPage;
