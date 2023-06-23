import { configureStore } from "@reduxjs/toolkit";
import { LoginSlice } from "../Crud/loginslice";


export const store = configureStore({
    reducer:{
        contents:LoginSlice.reducer,
     
     
    }
})