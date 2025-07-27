import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// Get tasks by projectId
export const fetchTasks = createAsyncThunk(
    "tasks/fetch",
    async (projectId, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/tasks/${projectId}`);
            return res.data.tasks;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch tasks");
        }
    }
);

// Create task
export const createTask = createAsyncThunk(
    "tasks/create",
    async ({ projectId, assignedTo, dueDate, title, description }, thunkAPI) => {
        try {
            const res = await axiosInstance.post(`/tasks`, {
                title,
                description,
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to create task");
        }
    }
);

// Update task
export const updateTask = createAsyncThunk(
    "tasks/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await axiosInstance.put(`/tasks/${id}`, data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update task");
        }
    }
);

// Delete task
export const deleteTask = createAsyncThunk(
    "tasks/delete",
    async (id, thunkAPI) => {
        try {
            await axiosInstance.delete(`/tasks/${id}`);
            return id;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete task");
        }
    }
);

// Slice
const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // FETCH TASKS
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // CREATE TASK
            .addCase(createTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // UPDATE TASK
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                const updatedTask = action.payload;
                const index = state.list.findIndex(task => task._id === updatedTask._id);
                if (index !== -1) {
                    state.list[index] = updatedTask;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // DELETE TASK
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                state.list = state.list.filter(task => task._id !== deletedId);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default tasksSlice.reducer;
