import { createContext } from 'react';

export const CartContext = createContext();

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [...state, action.item];
        case 'INCREMENT_ITEM':
            return state.map(item => {
                if (item.menu_name === action.item.menu_name) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
}

