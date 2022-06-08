import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categorySlicе from './slices/categorySlice';
import drawerSlice from './slices/drawerSlice';
import  productsSlice  from './slices/productSlice';
import orderSlice from './slices/orderSlice';
import tableSlice from './slices/tableSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    drawer: drawerSlice,
    categoriesState: categorySlicе,
    tables: tableSlice,
    products: productsSlice,
    orders: orderSlice,
    user: userSlice
  },
  devTools:true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;