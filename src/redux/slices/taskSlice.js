import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getTasksAPI,
  createTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
} from "../../services/taskService";

// ================= GET =================

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (_, { rejectWithValue }) => {
    try {
      return await getTasksAPI();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks.",
      );
    }
  },
);

// ================= CREATE =================

export const createTask = createAsyncThunk(
  "task/createTask",
  async (data, { rejectWithValue }) => {
    try {
      return await createTaskAPI(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create task.",
      );
    }
  },
);

// ================= UPDATE =================

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      return await updateTaskAPI(id, formData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update task.",
      );
    }
  },
);

// ================= DELETE =================

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteTaskAPI(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete task.",
      );
    }
  },
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET

      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data;
      })

      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE

      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload.data);
      })

      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE

      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.tasks.findIndex(
          (task) => task._id === action.payload.data._id,
        );

        if (index !== -1) {
          state.tasks[index] = action.payload.data;
        }
      })

      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE

      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteTask.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
