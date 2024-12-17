import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './slice/cartSlice'
import { productsSlice } from './slice/productsSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch