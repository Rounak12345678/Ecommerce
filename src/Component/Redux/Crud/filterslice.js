/* eslint-disable no-throw-literal */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/helper";


let initialState = {
  state: "idle",
  filterProducts:[],


  
  
};






export const filterByTitle = createAsyncThunk("filterByTitle",async(title)=>{
    try{
      const res = await axiosInstance.get(`/products/?title=${title}`);
      console.log(res);
      return res;
    }catch(err){
      throw err
    }


} )




export const FilterSlice = createSlice({
  name: "Filter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(filterByTitle.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(filterByTitle.fulfilled, (state, { payload }) => {
        console.log(payload, "payload");
        state.status = "idle";
        state.filterProducts = payload.data
        console.log(payload.data);
      
      
      })
      .addCase(filterByTitle.rejected, (state, action) => {
        state.status = "idle";
      })

  },
});
