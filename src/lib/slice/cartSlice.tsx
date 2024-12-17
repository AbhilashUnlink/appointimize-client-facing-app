/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    items: [],
    totalAmount: 0,
    cartCount: 0,
    drawer: {
        open: false,
        type: "",
    }
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const newItem: any = action.payload;
            // Check if item already exists in the cart
            const existingItem: any = state.items.find((item: any) => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.items.push(newItem);
            }
            // Update totalAmount and itemCount
            state.totalAmount += Number(newItem.price);
            state.cartCount = state.items.length;
        },
        removeItemFromCart: (state, action) => {
            const itemId = action.payload;
            const itemIndex = state.items.findIndex((item: any) => item.id === itemId);
            state.cartCount = state.cartCount - 1;
            if (itemIndex >= 0) {
                const item = state.items[itemIndex];
                state.totalAmount -= item.price * item.quantity;
                state.items.splice(itemIndex, 1);
            }
        },
 
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.cartCount = 0;
        },

        setDrawer: (state, { payload }) => {
            state.drawer.type = payload.type;
            state.drawer.open = payload.open;
        },
    },
});

export const { addItemToCart, removeItemFromCart, clearCart, setDrawer } = cartSlice.actions;

export default cartSlice.reducer;
