import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";
import projectReducer from "./slices/projectSlice";
import taskReducer from "./slices/taskSlice";
import userReducer from "./slices/userSlice";
import taskAssignReducer from "./slices/taskAssignSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    project: projectReducer,
    task: taskReducer,
    user: userReducer,
    assignment: taskAssignReducer,
  },
});
