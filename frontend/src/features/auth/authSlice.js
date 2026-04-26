import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api/api"

const initialState = {
  user: null,
  status: "idle",
  isAuthenticated: false,
  error: null
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const res = await api.post("/user/login", userData)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/user/dashboard")
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const res = await api.post("/user/logout")
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.status = "idle"
      state.isAuthenticated = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
        state.isAuthenticated = false
      })

      // FETCH USER
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isAuthenticated = true
        state.status = "succeeded"
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.status = "failed"
      })

      // LOGOUT USER
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isAuthenticated = false
        state.status = "succeeded"
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.status = "failed"
      })
  }
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer