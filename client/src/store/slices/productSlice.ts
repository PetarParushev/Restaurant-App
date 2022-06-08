import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  Product,
  ProductFormInput,
  ProductsState,
} from '../../models/interfaces/product';
import { httpClient } from '../../app/config/axios';
import { AppThunk } from '../store';

const initialState: ProductsState = {
  count: 0,
  error: null,
  rows: [],
  isLoading: false,
  isSuccess: false,
};

type createProductType = Omit<ProductFormInput, 'id'>;

export const createProduct = createAsyncThunk<ProductsState, createProductType>(
  'products/createProduct',
  async (inputData, thunkAPI) => {
    const axiosInstance = await httpClient();
    try {
      const formData = new FormData();
      Object.keys(inputData).forEach((prop) => {
        if (prop === 'file') {
          formData.append('photo', inputData.file[0]);
        }
        formData.append(
          prop,
          inputData[prop as keyof createProductType].toString()
        );
      });
      const { data } = await axiosInstance.post('/products', formData);

      return data;
    } catch (error) {
      const response = error.response as AxiosResponse;
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);
export const editProduct = createAsyncThunk<Product, ProductFormInput>(
  'products/editProduct',
  async (inputData, thunkAPI) => {
    const axiosInstance = await httpClient();
    try {
      const { data } = await axiosInstance.patch(
        `/products/${inputData.id}`,
        inputData
      );
      return data;
    } catch (error) {
      const response = error.response as AxiosResponse;
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);
export const deleteProduct = createAsyncThunk<number, number>(
  'products/deleteProduct',
  async (id, thunkAPI) => {
    const axiosInstance = await httpClient();
    try {
      await axiosInstance.delete(`/products/${id}`);
      return id;
    } catch (error) {
      const response = error.response as AxiosResponse;
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
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
    [createProduct.pending.type]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [createProduct.fulfilled.type]: (state, action) => {
      state.count += 1;
      state.isLoading = false;
      state.isSuccess = true;
      return state;
    },
    [createProduct.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      return state;
    },
    //edit
    [editProduct.pending.type]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [editProduct.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      return state;
    },
    [editProduct.fulfilled.type]: (state, {payload}) => {
      const index = state.rows.findIndex(product => product.id === payload.id);
      state.rows[index] = payload;
      state.isLoading = false;
      state.isSuccess = true;
      return state;
    },
    // delete
    [deleteProduct.pending.type]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [deleteProduct.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      return state;
    },
    [deleteProduct.fulfilled.type]: (state, { payload }) => {
      state.rows = state.rows.filter((product) => product.id !== +payload);
      state.count -= 1;
      state.isLoading = false;
      state.isSuccess = true;
      return state;
    },
  },
});

export const { setProducts, setError, setSuccess } = productsSlice.actions;

export const getProductsState = (params: any): AppThunk => async (dispatch) => {
  const axiosInstance = await httpClient();
  const { data } = await axiosInstance.get('/products', { params });

  dispatch(setProducts(data));
};

export default productsSlice.reducer;
