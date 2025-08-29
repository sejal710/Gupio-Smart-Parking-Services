import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    otp: string | null;
}

const initialState: AuthState = {
    otp: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setOtp: (state, action: PayloadAction<string>) => {
            state.otp = action.payload;
        },
        clearOtp: (state) => {
            state.otp = null;
        },
    },
});

export const { setOtp, clearOtp } = authSlice.actions;
export default authSlice.reducer;
