import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface Popup {
  title: string;
  imgUrl: string;
}

export interface WorkPopupState {
  data?: Popup;
}

const initialState: WorkPopupState = {}

export const workPopupSlice = createSlice({
  name: 'workPopup',
  initialState,
  reducers: {
    setData: (state, {payload}: PayloadAction<Popup | undefined>) => {
      state.data = payload;
    }
  },
})

export const { setData } = workPopupSlice.actions;

export const workPopup = {
  data: ({workPopup}: RootState) => workPopup.data,
};

export default workPopupSlice.reducer;