import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardAPI } from "../../services/dashboardService";

export const getDashboard = createAsyncThunk(
  "dashboard/getDashboard",
  async (_, { rejectWithValue }) => {
    try {
      return await getDashboardAPI();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load dashboard."
      );
    }
  }
);

const initialState = {
  dashboard: null,

  loading: false,

  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getDashboard.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getDashboard.fulfilled, (state, action) => {
        state.loading = false;

        state.dashboard = action.payload.data;
      })

      .addCase(getDashboard.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;