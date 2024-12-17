/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    searchText: ""
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

        setSearchText: (state, { payload }) => {
            state.searchText = payload;
        },
    },
});

export const { setSearchText } = productsSlice.actions;

export default productsSlice.reducer;
