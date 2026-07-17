import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMembersAPI,
  getAllUsersAPI,
  updateUserAPI,
  deleteUserAPI,
  updateUserRoleAPI,
  updateProfileAPI,
  changePasswordAPI,
} from "../../services/userService";

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

// ================= GET ALL USERS =================

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllUsersAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// ================= UPDATE USER =================

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateUserAPI({ id, data });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// ================= DELETE USER =================

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteUserAPI(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// ================= UPDATE ROLE =================

export const updateUserRole = createAsyncThunk(
  "user/updateRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      return await updateUserRoleAPI({ id, role });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// ================= update profile =================

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      return await updateProfileAPI(formData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile update failed.",
      );
    }
  },
);

// ================= cahnge pass =================

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      return await changePasswordAPI(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password change failed.",
      );
    }
  },
);

const initialState = {
  users: [],
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
      // ================= GET MEMBERS =================

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
      })

      // ================= GET ALL USERS =================

      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })

      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= UPDATE USER =================

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= DELETE USER =================

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= UPDATE ROLE =================

      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateUserRole.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= upd pro =================

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= change pass =================

      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
