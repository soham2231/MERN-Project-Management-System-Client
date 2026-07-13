import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProjectsAPI,
  createProjectAPI,
} from "../../services/projectService";

export const getProjects = createAsyncThunk(
  "project/getProjects",
  async (_, { rejectWithValue }) => {
    try {
      return await getProjectsAPI();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch projects.",
      );
    }
  },
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async (projectData, { rejectWithValue }) => {
    try {
      return await createProjectAPI(projectData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create project.",
      );
    }
  },
);

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      // ================= GET PROJECTS =================

      .addCase(getProjects.pending, (state) => {
        state.loading = true;
      })

      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.data;
      })

      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= CREATE PROJECT =================

      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })

      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.unshift(action.payload.data);
      })

      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
