import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProjectsAPI,
  createProjectAPI,
  updateProjectAPI,
  deleteProjectAPI,
} from "../../services/projectService";

// =====================================================
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
// =====================================================

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
// =====================================================

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateProjectAPI(id, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update project.",
      );
    }
  },
);

// =====================================================

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteProjectAPI(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete project.",
      );
    }
  },
);

// =====================================================

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
      // ================= get pro =================

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

      // ================= create pro =================

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
      })

      // ================= upd pro =================

      .addCase(updateProject.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.projects.findIndex(
          (project) => project._id === action.payload.data._id,
        );

        if (index !== -1) {
          state.projects[index] = action.payload.data;
        }
      })

      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= upd pro =================

      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteProject.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
