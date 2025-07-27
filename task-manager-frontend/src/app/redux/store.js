'use client';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectsReducer from "../features/projects/projectsSlice";
import tasksReducer from '../features/tasks/tasksSlice'
import { thunk } from 'redux-thunk'; // ✅ explicitly import thunk



export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    tasks: tasksReducer,


  },
  //  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

});
