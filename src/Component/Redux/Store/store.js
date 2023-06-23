import { configureStore } from "@reduxjs/toolkit";
import { LoginSlice } from "../Crud/loginslice";
import { ProductSlice } from "../Crud/productslice";
import { CategorySlice } from "../Crud/categoryslice";
import { FilterSlice } from "../Crud/filterslice";


export const store = configureStore({
    reducer:{
        contents:LoginSlice.reducer,
        product:ProductSlice.reducer,
        category:CategorySlice.reducer,
        filter:FilterSlice.reducer,
     
     
    }
})