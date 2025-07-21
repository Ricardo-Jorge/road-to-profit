import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import formFinanciadoService from "../services/formFinanciadoService";

// Estado inicial
const initialState = {
  forms: [],
  loading: false,
  error: null,
  success: false,
  message: null,
};

// Thunk create Form Financiado
export const createFormFinanciado = createAsyncThunk(
  "formFinanciado/create",
  async (forms, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await formFinanciadoService.createFormFinanciado(
        forms,
        token
      );
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk Get Forms
export const getAllFormsFinanciado = createAsyncThunk(
  "formFinanciado/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await formFinanciadoService.getAllFormsFinanciado(token);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// thunk Update form
export const updateFormFinanciado = createAsyncThunk(
  "formFinanciado/update",
  async (forms, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await formFinanciadoService.updateFormFinanciado(
        forms,
        token
      );
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// thunk Delete Form
export const deleteFormFinanciado = createAsyncThunk(
  "formFinanciado/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      await formFinanciadoService.deleteFormFinanciado(id, token);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
        const newForm = action.payload.form;
        state.forms.push(newForm);
        state.success = true;
        state.error = null;
      })
      .addCase(createFormFinanciado.rejected, (state, action) => {
        state.loading = false;
        // O payload agora é o que passamos para rejectWithValue
        if (action.payload && action.payload.errors) {
          state.error = action.payload.errors; // Armazena a array de mensagens de erro no estado
        } else {
          state.error = ["Ocorreu um erro desconhecido."]; // Fallback
        }
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
        const deletedFormId = action.payload;
        if (deletedFormId) {
          state.forms = state.forms.filter((form) => form.id !== deletedFormId);
          state.success = true;
        }
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
