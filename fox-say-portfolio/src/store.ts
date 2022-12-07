import { configureStore } from "@reduxjs/toolkit";
import workPopupReducer from "./pages/Work/workPopupSlice";
import themeReducer from "./components/Sidebar/themeSlice";

export const store = configureStore({
    reducer: {
        workPopup: workPopupReducer,
        theme: themeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;