import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import formAlugadoService from "../services/formAlugadoService";

// Estado inicial
const initialState = {
  forms: [],
  loading: false,
  error: null,
  success: false,
  message: null,
};

// Thunk create Form Alugado
export const createFormAlugado = createAsyncThunk(
  "formAlugado/create",
  async (forms, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const res = await formAlugadoService.createFormAlugado(forms, token);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk Get Forms

export const getAllFormsAlugado = createAsyncThunk(
  "formAlugado/getAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      if (!token) throw new Error("Token não encontrado");
      const response = await formAlugadoService.getAllFormsAlugado(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk Update Form
export const updateFormAlugado = createAsyncThunk(
  "formAlugado/update",
  async ({ id, forms }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const res = await formAlugadoService.updateFormAlugado(id, forms, token);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk Delete Form
export const deleteFormAlugado = createAsyncThunk(
  "formAlugado/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const res = await formAlugadoService.deleteFormAlugado(id, token);
      return { id, res };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const formAlugadoSlice = createSlice({
  name: "formAlugado",
  initialState,
  reducers: {
    // Redefine o estado de erro e sucesso
    resetMessage: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Form
      .addCase(createFormAlugado.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createFormAlugado.fulfilled, (state, action) => {
        state.loading = false;
        state.forms.push(action.payload);
        state.success = true;
        state.error = null;
      })
      .addCase(createFormAlugado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Get All Forms
      .addCase(getAllFormsAlugado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFormsAlugado.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.forms = action.payload;
        state.error = null;
      })
      .addCase(getAllFormsAlugado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.forms = [];
      })

      // Update Form
      .addCase(updateFormAlugado.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateFormAlugado.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = state.forms.map((form) =>
          form.id === action.payload.id ? action.payload : form
        );
        state.success = true;
        state.error = null;
      })
      .addCase(updateFormAlugado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Delete Form
      .addCase(deleteFormAlugado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFormAlugado.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = state.forms.filter(
          (form) => form.id !== action.payload.id
        );
        state.success = true;
        state.error = null;
      })
      .addCase(deleteFormAlugado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// exporta as ações e o reducer
export const { resetMessage } = formAlugadoSlice.actions;
export default formAlugadoSlice.reducer;
