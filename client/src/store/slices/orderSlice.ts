import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../../models/order";
import { httpClient } from "../../app/config/axios";
import { AppThunk } from "../store";

interface OrdersState {
  count: number;
  rows: Order[]
}

const initialState: OrdersState = {
  count:0,
  rows:[]
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state = action.payload;
      return state;
    },
    addOrder: (state,action) => {
      state.rows.push(action.payload);
      state.count++;
      return state;
    },
    updateOrder: (state,{payload}) => {
     return state;
    }
  },
});

const { setOrders, addOrder,updateOrder } = orderSlice.actions;

export const getOrderState = (params?: any): AppThunk => async (dispatch) => {
    const axiosInstance = await httpClient();
    const {data} = await axiosInstance.get("/orders",{params:params});

  dispatch(setOrders(data));
};
export const createOrder = (orderData: any): AppThunk => async (dispatch) => {
  const axiosInstance = await httpClient();
  const {data} = await axiosInstance.post("/orders",orderData);

dispatch(addOrder(data));
};
export const addProductsToOrder = (productData: any,orderId?:number): AppThunk => async (dispatch) => {
  const axiosInstance = await httpClient();
  const {data} = await axiosInstance.post(`/orders/${orderId}/addproducts`,productData);

dispatch(updateOrder({productData,orderId}));
};

export default orderSlice.reducer;