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
  async (forms, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await formAlugadoService.createFormAlugado(forms, token);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk Get Forms
export const getAllFormsAlugado = createAsyncThunk(
  "formAlugado/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await formAlugadoService.getAllFormsAlugado(token);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk Update Form
export const updateFormAlugado = createAsyncThunk(
  "formAlugado/update",
  async (forms, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await formAlugadoService.updateFormAlugado(forms, token);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk Delete Form
export const deleteFormAlugado = createAsyncThunk(
  "formAlugado/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      await formAlugadoService.deleteFormAlugado(id, token);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
      })
      .addCase(createFormAlugado.fulfilled, (state, action) => {
        state.loading = false;
        const newForm = action.payload.form;
        state.forms.push(newForm);
        state.success = true;
        state.error = null;
      })
      .addCase(createFormAlugado.rejected, (state, action) => {
        state.loading = false;

        if (action.payload && action.payload.errors) {
          state.error = action.payload.errors;
        } else {
          state.error = ["Ocorreu um erro desconhecido."];
        }
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
      })
      .addCase(updateFormAlugado.fulfilled, (state, action) => {
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
        const deletedFormId = action.payload;
        if (deletedFormId) {
          state.forms = state.forms.filter((form) => form.id !== deletedFormId);
          state.success = true;
        }
        state.error = null;
      })
      .addCase(deleteFormAlugado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = action.payload.message;
      });
  },
});

// exporta as ações e o reducer
export const { resetMessage } = formAlugadoSlice.actions;
export default formAlugadoSlice.reducer;
