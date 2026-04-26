import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

const initialState = {
   message: null,
   status: "idle",
   error: null
}

export const signupUser = createAsyncThunk(
   'user/signupUser',
   async(userData, thunkAPI)=>{
      try{
         const response = await api.post('/user/signup', userData)
         return response.data
      }catch(err){
         return thunkAPI.rejectWithValue(err.response?.data?.message || "Error signing up")
      }
   }
)

export const signupSlice = createSlice({
   name: 'signup',
   initialState,
   reducers:{
      setError:(state, action)=>{
         state.error = action.payload
      },
      clearError:(state)=>{
         state.error = null
      }
   },
   extraReducers:(builder)=>{
      builder
         .addCase(signupUser.pending, (state)=>{
            state.status = "loading"
            state.error = null
         })
         .addCase(signupUser.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.message = action.payload.message
         })
         .addCase(signupUser.rejected, (state, action)=>{
            state.status = "failed"
            state.error = action.payload
         })
   }
})

export const { setError, clearError } = signupSlice.actions
export default signupSlice.reducer