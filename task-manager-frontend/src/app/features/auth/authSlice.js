// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, googleLoginUser } from '../../services/authService';

// Login thunk
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    return await loginUser(credentials);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

// Register thunk
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    return await registerUser(userData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
  }
});


export const loginWithGoogle = createAsyncThunk(
  'auth/googleLogin',
  async (credential, thunkAPI) => {
    try {
      return await googleLoginUser(credential); // pass token string
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Google login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: typeof window !== 'undefined' && localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // ✅ clear token on logout

      }
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;


        // Save user data to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(action.payload));
          localStorage.setItem('token', action.payload.token); // ✅ Save token

        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // GOOGLE LOGIN
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(action.payload));
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
