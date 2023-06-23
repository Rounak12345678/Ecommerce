/* eslint-disable no-throw-literal */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/helper";

let initialState = {
  state: "idle",
  products: [],
  limit: 9,

};

export const getProduct = createAsyncThunk("product", async (user) => {
  try {
    const res = await axiosInstance.get("/products", user);
    return res;
  } catch (err) {
    throw err;
  }
});



export const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        console.log(payload, "payload");
        state.status = "idle";
        if (payload.status === 200) {
          state.products = payload.data;
        }
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});
