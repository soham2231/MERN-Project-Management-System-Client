import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUserAPI,
  registerUserAPI,
  getUserInfoAPI,
} from "../../services/authService";

// ================= REGISTER =================

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      return await registerUserAPI(formData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration Failed.",
      );
    }
  },
);

// ================= LOGIN =================

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(userData);

      localStorage.setItem("token", response.token);

      return response;
    } catch (error) {
      console.log(error);
      console.log(error.response);
      return rejectWithValue(error.response?.data?.message || "Login Failed.");
    }
  },
);

// ================= GET USER INFO =================

export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      return await getUserInfoAPI();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user.",
      );
    }
  },
);

const initialState = {
  token: localStorage.getItem("token") || null,

  isAuthenticated: !!localStorage.getItem("token"),

  user: null,

  loading: false,

  error: null,

  registrationStatus: null,

  loginStatus: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");

      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.registrationStatus = null;
      state.loginStatus = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= REGISTER =================

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationStatus = "loading";
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationStatus = "success";
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registrationStatus = "failed";
        state.error = action.payload;
      })

      // ================= LOGIN =================

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.loginStatus = "loading";
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginStatus = "succes";

        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginStatus = "failed";
        state.error = action.payload;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      })

      // ================= GET USER INFO =================

      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })

      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.data;

        state.isAuthenticated = true;
      })

      .addCase(getUserInfo.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;

        localStorage.removeItem("token");
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
