/* eslint-disable no-throw-literal */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/helper";

let initialState = {
  state: "idle",
  filterProducts: [],
};

export const filterByTitle = createAsyncThunk(
  "filterByTitle",
  async (title) => {
    try {
      const res = await axiosInstance.get(`/products/?title=${title}`);

      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const filterByRange = createAsyncThunk(
  "filterByRange",
  async (value) => {
    try {
      const res = await axiosInstance.get(
        `/products/?price_min=${value[0]}&price_max=${value[1]}`
      );

      return res;
    } catch (err) {
      throw err;
    }
  }
);

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
        state.status = "idle";
        state.filterProducts = payload.data;
      })

      .addCase(filterByTitle.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(filterByRange.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(filterByRange.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.filterProducts = payload.data;
        console.log(payload.data);
      })
      .addCase(filterByRange.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});
