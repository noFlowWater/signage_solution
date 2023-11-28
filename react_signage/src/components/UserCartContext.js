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
        case 'DECREASE_QUANTITY':
            return state.map(item => {
                if (item.menu_name === action.menuName) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
        case 'INCREASE_QUANTITY':
            return state.map(item => {
                if (item.menu_name === action.menuName) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        case 'REMOVE_MENU':
            return state.filter(item => item.menu_name !== action.menuName);
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
}


