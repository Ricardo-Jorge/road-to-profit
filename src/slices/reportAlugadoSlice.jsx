import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportAlugadoService from "../services/reportAlugadoService";

// Estado inicial
const initialState = {
  reports: {},
  loading: false,
  error: null,
  success: false,
  message: null,
};

// Thunk create Report Alugado
export const createReportAlugado = createAsyncThunk(
  "reportAlugado/create",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await reportAlugadoService.createReportAlugado(id, token);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk Get Form
export const getReportAlugado = createAsyncThunk(
  "reportAlugado/getOne",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (!token) throw new Error("Não autorizado.");
      const res = await reportAlugadoService.getReportAlugado(id, token);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteReportAlugado = createAsyncThunk(
  "reportAlugado/delete",
  async (formId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await reportAlugadoService.deleteReportAlugado(formId, token);
      return formId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Slice
const reportAlugadoSlice = createSlice({
  name: "reportAlugado",
  initialState,
  reducers: {
    resetReportMessage: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Report
      .addCase(createReportAlugado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReportAlugado.fulfilled, (state, action) => {
        state.loading = false;
        const newReport = action.payload;
        state.reports[newReport.FormAlugadoId] = newReport;
      })
      .addCase(createReportAlugado.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.errors) {
          state.error = action.payload.errors;
        } else {
          state.error = ["Ocorreu um erro desconhecido."];
        }
      })
      .addCase(getReportAlugado.pending, (state) => {
        state.loading = true;
        state.activeReport = null;
        state.error = null;
      })
      .addCase(getReportAlugado.fulfilled, (state, action) => {
        state.loading = false;
        const fetchedReport = action.payload;
        if (fetchedReport && fetchedReport.FormAlugadoId) {
          // Log para ver a chave que o reducer está usando
          console.log(
            "REDUCER KEY:",
            fetchedReport.FormAlugadoId,
            "type:",
            typeof fetchedReport.FormAlugadoId
          );
          state.reports[fetchedReport.FormAlugadoId] = fetchedReport;
        }
      })
      .addCase(getReportAlugado.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.errors) {
          state.error = action.payload.errors;
        } else {
          state.error = ["Ocorreu um erro desconhecido."];
        }
      })
      .addCase(deleteReportAlugado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReportAlugado.fulfilled, (state, action) => {
        const formId = action.payload;
        delete state.reports[formId];
      });
  },
});

export const { resetReportMessage } = reportAlugadoSlice.actions;
export default reportAlugadoSlice.reducer;
