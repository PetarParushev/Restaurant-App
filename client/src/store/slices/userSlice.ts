import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { RegisterFormInput, UserState } from '../../models/interfaces/user';
import { httpClient } from '../../app/config/axios';
import { AppThunk } from '../store';

const initialState: UserState = {
  error: null,
  user: {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    imagePath: '',
  },
  isLoading: false,
  isSuccess: false,
};

export const updateImage = createAsyncThunk<UserState, any>(
  'users/updateImage',
  async (inputData, thunkAPI) => {
    const axiosInstance = await httpClient();
    try {
      const formData = new FormData();
      formData.append('photo', inputData.data.file[0]);
      const { data } = await axiosInstance.post(
        `/users/${inputData.id}/upload`,
        formData
      );
      return data;
    } catch (error) {
      const response = error.response as AxiosResponse;
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);
export const signUp = createAsyncThunk<UserState, RegisterFormInput>(
  'users/signUp',
  async (inputData, thunkAPI) => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL_LOCAL,
        withCredentials:true,
      })
    try {
      const { data } = await axiosInstance.post('/users', inputData);
      return data;
    } catch (error) {
      const response = error.response as AxiosResponse;
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      return state;
    },
    setError: (state) => {
        state.error = null;
      },
  },
  extraReducers: {
    [updateImage.pending.type]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [updateImage.fulfilled.type]: (state, { payload }) => {
      state.user.imagePath = payload;
      state.isLoading = false;
      state.isSuccess = true;
      return state;
    },
    [updateImage.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      return state;
    },
    //signUp
    [signUp.pending.type]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [signUp.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      return state;
    },
    [signUp.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;

export const getUser = (oAuthId: string): AppThunk => async (dispatch) => {
  const axiosInstance = await httpClient();
  const { data } = await axiosInstance.get(`/users/${oAuthId}`);
  dispatch(setUser(data));
};

export default userSlice.reducer;
