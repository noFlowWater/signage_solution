import { createContext } from 'react';

export const CartContext = createContext();

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [...state, action.item];
        default:
            return state;
    }
}
