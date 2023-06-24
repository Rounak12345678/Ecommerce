/* eslint-disable no-throw-literal */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/helper";

let initialState = {
  state: "idle",
  products: [],

};

export const getProduct = createAsyncThunk("product", async (user) => {
  try {
    const res = await axiosInstance.get("/products", user);
    return res;
  } catch (err) {
    throw err;
  }
});

export const ProductPaginate = createAsyncThunk("productPaginate", async ({offset,limit}) => {
  try {
   
    const res = await axiosInstance.get(`/products?offset=${offset}&limit=${limit}`);
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
   
        state.status = "idle";
        if (payload.status === 200) {
          state.products = payload.data;
        }
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(ProductPaginate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(ProductPaginate.fulfilled, (state, { payload }) => {
       
        state.status = "idle";
        if (payload.status === 200) {
          state.products = payload.data;
        }
      })
      .addCase(ProductPaginate.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});
