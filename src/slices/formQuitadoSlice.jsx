import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import formQuitadoService from "../services/formQuitadoService";

// Initial State
const initialState = {
  forms: [],
  Loading: false,
  error: null,
  success: false,
  message: false,
};

// Thunk create form Quitado
export const createFormQuitado = createAsyncThunk(
  "formQuitado/create",
  async (forms, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await formQuitadoService.createFormQuitado(forms, token);
      return res;
    } catch (error) {
      console.log("Erro capturado no Thunk:", error); // Verifique este log!
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk Get Forms
export const getAllFormsQuitado = createAsyncThunk(
  "formQuitado/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await formQuitadoService.getAllFormsQuitado(token);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk Update form
export const updateFormQuitado = createAsyncThunk(
  "formQuitado/update",
  async (forms, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await formQuitadoService.updateFormQuitado(forms, token);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk delete form
export const deleteFormQuitado = createAsyncThunk(
  "formQuitado/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      await formQuitadoService.deleteFormQuitado(id, token);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
const formQuitadoSlice = createSlice({
  name: "formQuitado",
  initialState,
  reducers: {
    resetMessageQuitado: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFormQuitado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFormQuitado.fulfilled, (state, action) => {
        state.loading = false;
        const newForm = action.payload.form;
        state.forms.push(newForm);
        state.success = true;
        state.error = null;
      })
      .addCase(createFormQuitado.rejected, (state, action) => {
        state.loading = false;
        // O payload agora é o que passamos para rejectWithValue
        if (action.payload && action.payload.errors) {
          state.error = action.payload.errors; // Armazena a array de mensagens de erro no estado
        } else {
          state.error = ["Ocorreu um erro desconhecido."]; // Fallback
        }
      })
      .addCase(getAllFormsQuitado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFormsQuitado.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.forms = action.payload;
        state.error = null;
      })
      .addCase(getAllFormsQuitado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.forms = [];
      })
      .addCase(updateFormQuitado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFormQuitado.fulfilled, (state, action) => {
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
      .addCase(updateFormQuitado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteFormQuitado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFormQuitado.fulfilled, (state, action) => {
        state.loading = false;
        const deletedFormId = action.payload;
        if (deletedFormId) {
          state.forms = state.forms.filter((form) => form.id !== deletedFormId);
          state.success = true;
        }
        state.error = null;
      })
      .addCase(deleteFormQuitado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = action.payload.message;
      });
  },
});

export const { resetMessageQuitado } = formQuitadoSlice.actions;
export default formQuitadoSlice.reducer;
