import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";


// GET all projects
export const fetchProjects = createAsyncThunk("projects/fetch", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("/projects");
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// CREATE a new project
export const createProject = createAsyncThunk(
  'projects/createProject',
  async ({ name, description }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/projects', { name, description });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to create project');
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch";
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload); 
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectsSlice.reducer;
