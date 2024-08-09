import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user:  null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Login user
export const LoginUser = createAsyncThunk('auth/LoginUser', async (user, thunkAPI) => {
    try {
        const response = await axios.post('https://vercelhs.vercel.app/api/login', {
            email: user.email,
            password: user.password
        });
        
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

// Get user data
export const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        return JSON.parse(storedUser);
    }
    try {
        const response = await axios.get('https://vercelhs.vercel.app/api/me');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

// Logout user
export const LogOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await axios.post('https://vercelhs.vercel.app/api/logout');
        
        localStorage.removeItem('user');
        return;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });

        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });

        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        builder.addCase(LogOut.fulfilled, (state) => {
            state.user = null; // Reset user state
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
