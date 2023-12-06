import React from 'react';
import { kiosk } from '../constants';

const UserCartCheck = () => {
  const userCart = localStorage.getItem('userCart');
  const cartItems = userCart ? JSON.parse(userCart) : [];

  return (
    <div  style={{ display: 'flex', flexWrap: 'wrap' }}>
      {cartItems.map((item, index) => (
        <div key={index}>
          <img src={`${kiosk}/${item.file_path}`}  alt={item.menu_name} style={{ width: '30%', height:"auto",marginBottom: '10px' }} />
          <h1>{item.menu_name}</h1>
          <p>{item.price}</p>
          <p>수량: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default UserCartCheck;
