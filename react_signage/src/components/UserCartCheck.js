import React from 'react';

const UserCartCheck = () => {
  const userCart = localStorage.getItem('userCart');
  const cartItems = userCart ? JSON.parse(userCart) : [];

  return (
    <div>
      {cartItems.map((item, index) => (
        <div key={index}>
          <h1>{item.menu_name}</h1>
          <p>{item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default UserCartCheck;
