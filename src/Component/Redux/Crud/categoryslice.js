/* eslint-disable no-throw-literal */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/helper";


let initialState = {
  state: "idle",
  categories:[],
  caregoryList:[],
  
  
};






export const getCategory = createAsyncThunk("category",async()=>{
    try{
      const res = await axiosInstance.get("/categories");
      return res;
    }catch(err){
      throw err
    }


} )

export const getProductByCategory = createAsyncThunk("productCategory",async(id)=>{
    try{
      const res = await axiosInstance.get(`/categories/${id}/products`);
      return res;
    }catch(err){
      throw err
    }


} )



export const CategorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCategory.fulfilled, (state, { payload }) => {
        console.log(payload, "payload");
        state.status = "idle";
        if(payload.status === 200){
            state.categories = payload.data
          }
      
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(getProductByCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProductByCategory.fulfilled, (state, { payload }) => {
        console.log(payload, "payload");
        state.status = "idle";
        if(payload.status === 200){
            state.caregoryList = payload.data
          }
      
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});
