// store/spotsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SpotsState {
    total: number;
    available: number;
}

const initialState: SpotsState = {
    total: 100,      // fixed total spots
    available: 30,   // default available
};

const spotsSlice = createSlice({
    name: "spots",
    initialState,
    reducers: {
        setAvailableSpots: (state, action: PayloadAction<number>) => {
            state.available = action.payload;
        },
        confirmSpot: (state) => {
            if (state.available > 0) {
                state.available -= 1; // decrease on booking
            }
        },
        cancelSpot: (state) => {
            if (state.available < state.total) {
                state.available += 1; // increase on cancel
            }
        },
        resetSpots: (state) => {
            state.available = initialState.available;
        },
    },
});

export const { setAvailableSpots, confirmSpot, cancelSpot, resetSpots } =
    spotsSlice.actions;

export default spotsSlice.reducer;
