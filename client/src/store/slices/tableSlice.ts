import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Table, TableFormInput, TableState } from "../../models/interfaces/table";
import { httpClient } from "../../app/config/axios";
import { AppThunk } from "../store";


const initialState: TableState = {
  count: 0,
  error: null,
  rows: [],
  isLoading: false,
  isSuccess: false,
};
type createTableType = Omit<TableFormInput, 'id'>;

export const createTable = createAsyncThunk<TableState, createTableType>(
  'tables/createTable',
  async (inputData, thunkAPI) => {
    const axiosInstance = await httpClient();
    try {
      const { data } = await axiosInstance.post('/tables', inputData);
      return data;
    } catch (error) {
      const response = error.response as AxiosResponse;
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);
export const editTable = createAsyncThunk<Table, TableFormInput>(
  'tables/editTable',
  async (inputData, thunkAPI) => {
    const axiosInstance = await httpClient();
    try {
      const { data } = await axiosInstance.patch(
        `/tables/${inputData.id}`,
        inputData
      );
      return data;
    } catch (error) {
      const response = error.response as AxiosResponse;
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);
export const deleteTable = createAsyncThunk<number, number>(
  'tables/deleteTable',
  async (id, thunkAPI) => {
    const axiosInstance = await httpClient();
    try {
      await axiosInstance.delete(`/tables/${id}`);
      return id;
    } catch (error) {
      const response = error.response as AxiosResponse;
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);
export const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setTables: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setError: (state) => {
      state.error = null;
    },
    setSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: {
    // create
    [createTable.pending.type]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [createTable.fulfilled.type]: (state, action) => {
      state.count += 1;
      state.isLoading = false;
      state.isSuccess = true;
      return state;
    },
    [createTable.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      return state;
    },
    //edit
    [editTable.pending.type]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [editTable.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      return state;
    },
    [editTable.fulfilled.type]: (state, {payload}) => {
      const index = state.rows.findIndex(table => table.id === payload.id);
      state.rows[index] = payload;
      state.isLoading = false;
      state.isSuccess = true;
      return state;
    },
    // delete
    [deleteTable.pending.type]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [deleteTable.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      return state;
    },
    [deleteTable.fulfilled.type]: (state, { payload }) => {
      state.rows = state.rows.filter((table) => table.id !== +payload);
      state.count -= 1;
      state.isLoading = false;
      state.isSuccess = true;
      return state;
    },
  },
});


export const { setTables, setError, setSuccess } = tableSlice.actions;

export const getTablesState = (params? : any): AppThunk => async (dispatch) => {
    const axiosInstance = await httpClient();
    const {data} = await axiosInstance.get("/tables",{ params });

  dispatch(setTables(data));
};
export default tableSlice.reducer;