import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAssignmentsAPI,
  assignTaskAPI,
  updateAssignmentStatusAPI,
} from "../../services/taskAssignService";

// ==================================================

export const getAssignments = createAsyncThunk(
  "assignment/getAssignments",
  async (_, { rejectWithValue }) => {
    try {
      return await getAssignmentsAPI();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch assignments.",
      );
    }
  },
);

// ==================================================

export const assignTask = createAsyncThunk(
  "assignment/assignTask",
  async (data, { rejectWithValue }) => {
    try {
      return await assignTaskAPI(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to assign task.",
      );
    }
  },
);

// ==================================================

export const updateAssignmentStatus = createAsyncThunk(
  "assignment/updateAssignmentStatus",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateAssignmentStatusAPI(id, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update assignment status.",
      );
    }
  },
);

// ==================================================

const initialState = {
  assignments: [],
  loading: false,
  error: null,
};

const taskAssignSlice = createSlice({
  name: "assignment",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= GET =================

      .addCase(getAssignments.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload.data;
      })

      .addCase(getAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= CREATE =================

      .addCase(assignTask.pending, (state) => {
        state.loading = true;
      })

      .addCase(assignTask.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments.unshift(action.payload.data);
      })

      .addCase(assignTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= UPDATE =================

      .addCase(updateAssignmentStatus.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateAssignmentStatus.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.assignments.findIndex(
          (assignment) => assignment._id === action.payload.data._id,
        );

        if (index !== -1) {
          state.assignments[index] = action.payload.data;
        }
      })

      .addCase(updateAssignmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskAssignSlice.reducer;
