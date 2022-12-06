import { configureStore } from "@reduxjs/toolkit";
import workPopupReducer from "./features/workPopup/workPopupSlice";

export const store = configureStore({
    reducer: {
        workPopup: workPopupReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;