import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

const initialState = {
   message: null,
   status: 'idle',
   error: null
}

export const sendPasswordLink = createAsyncThunk(
   'user/sendPasswordLink',
   async(email, thunkAPI)=>{
      try{
         const res = await api.post('/user/forgot-password', email)
         return res.data
      }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Couldn't send link to change password") 
      }
   }
)

export const forgotPasswordSlice = createSlice({
   name: 'forgotPassword',
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
         .addCase(sendPasswordLink.pending, (state)=>{
            state.status = 'loading'
            state.error = null
         })
         .addCase(sendPasswordLink.fulfilled, (state, action)=>{
            state.status = 'succeeded'
            state.message = action.payload.message
         })
         .addCase(sendPasswordLink.rejected, (state, action)=>{
            state.status = 'failed'
            state.error = action.payload
         })
   }
})

export const { setError, clearError } = forgotPasswordSlice.actions
export default forgotPasswordSlice.reducer