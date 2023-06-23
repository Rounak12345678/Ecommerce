/* eslint-disable no-throw-literal */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/helper";
import axios from "axios";

let initialState = {
  state: "idle",
  products:[],
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

export const signup = createAsyncThunk("signup", async (user, { dispatch }) => {
  try {
    const allUsers = await axiosInstance.get("/users");
    const findUser = allUsers.data.find((item) => item.email === user.email);
    if (findUser) {
      throw new Error("email exists");
    } else {
      const signUp = await axiosInstance.post("/users", user);
      return signUp?.data;
    }
  } catch (err) {
    throw err;
  }
});

export const ForgotPassword2 = createAsyncThunk(
  "forgotPassword",
  async (user) => {
    try {
      const allUser = await axiosInstance.get("/users");

      const checkEmail = allUser?.data?.find(
        (item) => item?.email === user?.email,
      );
      // if (findUser) {
      //   await axios.post(
      //     "https://cd0b-182-79-73-22.ngrok-free.app/sendMail",
      //     findUser,
      //   );
      //   throw { msg: "password sent" };
      // } else {
      //   throw { msg: "user is not exists" };
      // }
      if (checkEmail) {
        await axios.post(
          "https://cd0b-182-79-73-22.ngrok-free.app/sendMail",
          checkEmail,
        );
        return  { message: `Your password is sent to your register Email` };
      } else {
        throw new Error(  "User Does Not Exist" );
      }
    } catch (err) {
      throw { msg: "user is not exists" };
    }
  },
);

export const login = createAsyncThunk("login", async(user) => {
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
          localStorage.setItem("access_token", payload.data.access_token);
          state.status = "idle";
        }
        console.log(payload?.data, "payload login");
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "idle";
      })

  },
});
