import { createSlice } from '@reduxjs/toolkit';
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
    toggleTheme: (state) => {
      const getDifferentTheme: Theme = state.themeStatus === "light" ? "dark" : "light";

      state.themeStatus = getDifferentTheme;
      localStorage.setItem("theme", getDifferentTheme);
    }
  },
})

export const { toggleTheme } = themeSlice.actions;

export const theme = {
  status: ({theme}: RootState) => theme.themeStatus,
};

export default themeSlice.reducer;