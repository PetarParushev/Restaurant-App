import { createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../app/config/axios";
import { Category } from "../../models/category";
import { AppThunk } from "../store";

interface CategoryState {
  categories: Category[];
  error: string | null;
}

const initialState: CategoryState = {
  categories:[],
  error:null
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      return state;
    },
    addCategory: (state, action) => {
      state.categories.unshift(action.payload);
      return state;
    },
    setCategoryError: (state,action) => {
      state.error = action.payload;
      return state;
    }
  },
});

export const { setCategories, addCategory,setCategoryError } = categorySlice.actions;

export const getCategoriesState = (): AppThunk => async (dispatch) => {
    const axiosInstance = await httpClient();
    const {data} = await axiosInstance.get("/categories");

  dispatch(setCategories(data));
};

export const createCategory = (data: FormData): AppThunk => async (dispatch) => {
  const axiosInstance = await httpClient();
  axiosInstance
  .post('/categories', data)
  .then(({ data }) => {
    dispatch(addCategory({ ...data }))
    dispatch(setCategoryError(null));
  })
  .catch((error) => {
    dispatch(setCategoryError(error.response.data))
  });

  
};

export default categorySlice.reducer;