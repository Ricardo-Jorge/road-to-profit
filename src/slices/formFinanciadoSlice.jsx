import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import formFinanciadoService from "../services/formFinanciadoService";

// Estado inicial
const initialState = {
  forms: [],
  Loading: false,
  error: null,
  success: false,
  message: null,
};

// Thunk create Form Financiado
export const createFormFinanciado = createAsyncThunk(
  "formFinanciado/create",
  async (forms, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const res = await formFinanciadoService.createFormFinanciado(
        forms,
        token
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk Get Forms
export const getAllFormsFinanciado = createAsyncThunk(
  "formFinanciado/getAll",
  async (__dirname, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await formFinanciadoService.getAllFormsFinanciado(token);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// thunk Update form
export const updateFormFinanciado = createAsyncThunk(
  "formFinanciado/update",
  async ({ id, forms }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const res = await formFinanciadoService.updateFormFinanciado(
        id,
        forms,
        token
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// thunk Delete Form
export const deleteFormFinanciado = createAsyncThunk(
  "formFinanciado/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      await formFinanciadoService.deleteFormFinanciado(id, token);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Slice
const formFinanciadoSlice = createSlice({
  name: "formFinanciado",
  initialState,
  reducers: {
    resetMessageFinanciado: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFormFinanciado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFormFinanciado.fulfilled, (state, action) => {
        state.loading = false;
        state.forms.push(action.payload);
        state.success = true;
        state.error = null;
      })
      .addCase(createFormFinanciado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getAllFormsFinanciado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFormsFinanciado.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.forms = action.payload;
        state.error = null;
      })
      .addCase(getAllFormsFinanciado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.forms = [];
      })
      .addCase(updateFormFinanciado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFormFinanciado.fulfilled, (state, action) => {
        state.loading = false;
        const updatedForm = action.payload.form;
        if (updatedForm && updatedForm.id) {
          state.forms = state.forms.map((form) =>
            form.id === updatedForm.id ? updatedForm : form
          );
          state.success = true;
        }
        state.error = null;
      })
      .addCase(updateFormFinanciado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteFormFinanciado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFormFinanciado.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = state.forms.filter(
          (form) => form.id !== action.payload.id
        );
        state.success = true;
        state.error = null;
      })
      .addCase(deleteFormFinanciado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = action.payload.message;
      });
  },
});

export const { resetMessageFinanciado } = formFinanciadoSlice.actions;
export default formFinanciadoSlice.reducer;
