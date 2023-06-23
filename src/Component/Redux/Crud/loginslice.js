/* eslint-disable no-throw-literal */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/helper";

let initialState = {
  state: "idle",
};

// export const emailCheck = createAsyncThunk("isEmail", async (user) => {
//     try {
//       let res = await axiosInstance.post("/users/is-available", user);
//       if (res.data.status === 200) {
//         return res.data;
//       } else {
//         throw res.data;
//       }
//     } catch (err) {
//       throw err;
//     }
//   });

export const signup = createAsyncThunk("signup", async(user, { dispatch }) => {
  try {
    const checkUser = await axiosInstance.post("/auth/login", user);
    if (checkUser?.status === 201) {
      throw new Error({
        msg: "error",
      });
    }
  } catch (err) {
    if(err?.response.status === 401){
      let res = await axiosInstance.post("/users", user);
        return res;
    }
    throw err;
  }
});

export const login = createAsyncThunk("login", async (user) => {
  try {
    const res = await axiosInstance.post("/auth/login", user);
    return res;
  } catch (err) {
    console.log("object");
    throw err;
  }
});

export const LoginSlice = createSlice({
  name: "Registration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        if (payload?.status === 201) {
          state.status = "idle";
        }
        console.log(payload?.data, "payload signup");
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        if (payload?.status === 201) {
          localStorage.setItem("access_token", payload.data.access_token)
          state.status = "idle";
        }
        console.log(payload?.data, "payload login");
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "idle";
      });
    //   .addCase(emailCheck.pending, (state, action) => {
    //     state.status = "loading";
    //   })
    //   .addCase(emailCheck.fulfilled, (state, { payload }) => {
    //     console.log(payload, "payload");

    //     state.status = "idle";
    //   })
    //   .addCase(emailCheck.rejected, (state, action) => {
    //     state.status = "idle";
    //   });
  },
});
