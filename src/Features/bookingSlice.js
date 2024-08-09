import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state for bookings
const initialState = {
    bookings: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

// Async thunk to create a booking
export const createBooking = createAsyncThunk('bookings/createBooking', async (bookingData, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5000/booking', bookingData);
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

// Booking slice
export const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBooking.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bookings.push(action.payload);
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export default bookingSlice.reducer;
