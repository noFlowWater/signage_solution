// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import React from 'react';
import UserNavBar from "../components/UserNavBar";
import UserMenu from '../components/UserMenu';
import UserCart from "../components/UserCart";

const UserMenuPage = () => {
    return (
        <div>
            <UserNavBar />
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 4, borderRight: '2px solid black', padding: '100px', backgroundColor: '#f8f8f8' }}>
                    <UserMenu />
                </div>
                <div style={{ flex: 1, padding: '100px', backgroundColor: '#e8e8e8' }}>
                    <UserCart />
                </div>
            </div>
        </div>
    )
}

export default UserMenuPage;