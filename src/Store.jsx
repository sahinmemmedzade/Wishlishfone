import { configureStore } from "@reduxjs/toolkit";
import BasketSlice from "./Slice/BasketSlice";


export const Store=configureStore({
    reducer:{
        basket:BasketSlice,
    }
})