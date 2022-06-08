import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface DrawerState {
  isDraweOpened: boolean;
}

const initialState: DrawerState = {
  isDraweOpened: false,
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    changeState: state => {
      state.isDraweOpened  = !state.isDraweOpened;
    },
  },
});

export const { changeState } = drawerSlice.actions;

export const isDrawerOpened = (state: RootState) => state.drawer.isDraweOpened;

export default drawerSlice.reducer;
