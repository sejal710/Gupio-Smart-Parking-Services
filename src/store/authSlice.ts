import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
    otp: string | null;
    employeeId: string | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    otp: null,
    employeeId: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setOTP: (state, action: PayloadAction<string>) => {
            state.otp = action.payload;
            AsyncStorage.setItem("otp", action.payload);
        },
        clearOTP: (state) => {
            state.otp = null;
            AsyncStorage.removeItem("otp");
        },
        setEmployeeId: (state, action: PayloadAction<string>) => {
            state.employeeId = action.payload;
            AsyncStorage.setItem("employeeId", action.payload);
        },
        clearEmployeeId: (state) => {
            state.employeeId = null;
            AsyncStorage.removeItem("employeeId");
        },
        setLogin: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
            AsyncStorage.setItem("isLoggedIn", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.otp = null;
            state.employeeId = null;
            state.isLoggedIn = false;
            AsyncStorage.multiRemove(["otp", "employeeId", "isLoggedIn"]);
        },
        loadFromStorage: (
            state,
            action: PayloadAction<{ otp: string | null; employeeId: string | null; isLoggedIn: boolean }>
        ) => {
            state.otp = action.payload.otp;
            state.employeeId = action.payload.employeeId;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
});

export const {
    setOTP,
    clearOTP,
    setEmployeeId,
    clearEmployeeId,
    setLogin,
    logout,
    loadFromStorage,
} = authSlice.actions;

export default authSlice.reducer;
