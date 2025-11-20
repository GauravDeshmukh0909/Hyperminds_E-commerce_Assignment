import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// LOGIN API CALL
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async ({ email, password }, thunkAPI) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                email,
                password,
            });

            return res.data; // token + user
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

// LOGOUT API CALL (optional)
export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, thunkAPI) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );

      return res.data; // user + token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        // ---- LOGIN ----
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;  // backend returns user
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });



        // ---- LOGOUT ----
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                localStorage.removeItem("token");
            });

        // ------ REGISTER ------
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;