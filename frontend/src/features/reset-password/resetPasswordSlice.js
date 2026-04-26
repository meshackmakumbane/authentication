import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

const initialState = {
   message: null,
   status: 'idle',
   error: null
}

export const resetPassword = createAsyncThunk(
   'user/resetPassword',
   async(userData, thunkAPI)=>{
      try{
         const res = await api.post('/user/reset-password', userData)
         return res.data
      }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Couldn't reset password") 
      }
   }
)

export const resetPasswordSlice = createSlice({
   name: 'resetPassword',
   initialState,
   reducers:{
      setError:(state, action)=>{
         state.error = action.payload
      },
      clearError:(state)=>{
         state.message = null
         state.status = 'idle',
         state.error = null
      }
   },
   extraReducers:(builder)=>{
      builder
         .addCase(resetPassword.pending, (state)=>{
            state.status = 'loading'
            state.error = null
         })
         .addCase(resetPassword.fulfilled, (state, action)=>{
            state.status = 'succeeded'
            state.message = action.payload.message
         })
         .addCase(resetPassword.rejected, (state, action)=>{
            state.status = 'failed'
            state.error = action.payload
         })
   }
})

export const { setError, clearError } = resetPasswordSlice.actions
export default resetPasswordSlice.reducer