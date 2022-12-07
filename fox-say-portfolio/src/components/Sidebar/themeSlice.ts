import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type Theme = "light" | "dark";

export interface ThemeState {
  themeStatus: Theme;
}

const initialState: ThemeState = {
  themeStatus: localStorage.getItem('theme') as Theme ?? "light",
}

export const themeSlice = createSlice({
  name: 'workPopup',
  initialState,
  reducers: {
    changeTheme: (state, {payload}: PayloadAction<Theme>) => {
      state.themeStatus = payload;
      localStorage.setItem("theme", payload);
    }
  },
})

export const { changeTheme } = themeSlice.actions;

export const theme = {
  status: ({theme}: RootState) => theme.themeStatus,
};

export default themeSlice.reducer;