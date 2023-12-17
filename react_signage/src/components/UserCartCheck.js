import React from 'react';
import { kiosk } from '../constants';

const UserCartCheck = () => {
  const userCart = localStorage.getItem('userCart');
  const cartItems = userCart ? JSON.parse(userCart) : [];

  return (
    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <div  style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cartItems.map((item, index) => (
          <div key={index} style={{ width: '33%', padding: '10px' }}>
            <div style={{ backgroundColor: '#f8f8f8', width: '100%', height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '20px', boxShadow: "0px 4px 10px rgba(0, 0, 0, 5)"  }}>
              <img src={`${kiosk}/${item.file_path}`}  alt={item.menu_name} style={{ width: '40%', height: 'auto', marginBottom: '10px' }} />
              <div style={{fontFamily:"SansB",fontSize:'30px'}}>{item.menu_name}</div>
              <div style={{fontFamily:"SansM",fontSize:'20px'}}>￦{item.price}</div>
              <div style={{fontFamily:"SansM",fontSize:'20px'}}>수량: {item.quantity}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default UserCartCheck;
