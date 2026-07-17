import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMembersAPI } from "../../services/userService";

// ================= GET MEMBERS =================

export const getMembers = createAsyncThunk(
  "user/getMembers",
  async (_, { rejectWithValue }) => {
    try {
      return await getMembersAPI();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch members.",
      );
    }
  },
);

const initialState = {
  members: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getMembers.pending, (state) => {
        state.loading = true;
      })

      .addCase(getMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload.data;
      })

      .addCase(getMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
