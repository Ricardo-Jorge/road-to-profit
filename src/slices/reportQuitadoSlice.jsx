import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportQuitadoService from "../services/reportQuitadoService";

const initialState = {
  reports: {},
  loading: false,
  error: null,
  success: false,
  message: null,
};

//Thunk create Report Quitado
export const createReportQuitado = createAsyncThunk(
  "reportQuitado/create",
  async (formId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await reportQuitadoService.createReportQuitado(formId, token);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk Get Report
export const getReportQuitado = createAsyncThunk(
  "reportQuitado/getOne",
  async (formId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await reportQuitadoService.getReportQuitado(formId, token);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk Get Report
export const deleteReportQuitado = createAsyncThunk(
  "reportQuitado/delete",
  async (formId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await reportQuitadoService.deleteReportQuitado(formId, token);
      return formId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Slice
const reportQuitadoSlice = createSlice({
  name: "reportQuitado",
  initialState,
  reducers: {
    resetReportQuitadoMessage: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReportQuitado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReportQuitado.fulfilled, (state, action) => {
        state.loading = false;
        const newReport = action.payload;
        state.reports[newReport.FormQuitadoId] = newReport;
      })
      .addCase(createReportQuitado.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.errors) {
          state.error = action.payload.errors;
        } else {
          state.error = ["Ocorreu um erro desconhecido."];
        }
      })
      .addCase(getReportQuitado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReportQuitado.fulfilled, (state, action) => {
        state.loading = false;
        const fetchedReport = action.payload;
        if (fetchedReport && fetchedReport.FormQuitadoId) {
          state.reports[fetchedReport.FormQuitadoId] = fetchedReport;
        }
      })
      .addCase(getReportQuitado.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.errors) {
          state.error = action.payload.errors;
        } else {
          state.error = ["Ocorreu um erro desconhecido."];
        }
      })
      .addCase(deleteReportQuitado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReportQuitado.fulfilled, (state, action) => {
        const formId = action.payload;
        delete state.reports[formId];
      });
  },
});

export const { resetReportQuitadoMessage } = reportQuitadoSlice.actions;
export default reportQuitadoSlice.reducer;
