import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface WorkPopupState {
  popupIsOpen: boolean;
  popupTitle: string;
  popupImgUrl: string;
}

const initialState: WorkPopupState = {
  popupIsOpen: false,
  popupTitle: "",
  popupImgUrl: ""
}

export const workPopupSlice = createSlice({
  name: 'workPopup',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
        state.popupTitle = action.payload;
    },
    setImageUrl: (state, action: PayloadAction<string>) => {
        state.popupImgUrl = action.payload;
    },
    setPopupIsOpen: (state, action: PayloadAction<boolean>) => {
        state.popupIsOpen = action.payload;
    }
  },
})

export const { setTitle, setImageUrl, setPopupIsOpen } = workPopupSlice.actions;

export default workPopupSlice.reducer;