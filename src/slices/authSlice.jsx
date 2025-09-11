import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  error: null,
  success: false,
  loading: false,
};

// Register an user and sign in
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const data = await authService.register(user, thunkAPI.dispatch);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Logout an user
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

// Sign in an user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const data = await authService.login(user, thunkAPI.dispatch);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.errors) {
          state.error = action.payload.errors;
        } else {
          state.error = ["Ocorreu um erro desconhecido."];
        }
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.errors) {
          state.error = action.payload.errors;
        } else {
          state.error = ["Ocorreu um erro desconhecido."];
        }
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
