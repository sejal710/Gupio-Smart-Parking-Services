import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./slices/counterSlice";
import authReducer from "./authSlice";
import spotReducer from "./spotSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        spots: spotReducer,
    },
});

// Types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
