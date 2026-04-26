import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

const initialState = {
   message: null,
   status: 'idle',
   error: null
}

export const verifyUser = createAsyncThunk(
   'user/verifyUser',
   async(token, thunkAPI) =>{
      try{
         const response = await api.post('/user/verify-email', token)
         return response.data
      }catch(err){
         return thunkAPI.rejectWithValue(err.response?.data?.message || "Couldn't verify user")
      }
   }
)

export const verifySlice = createSlice({
   name: 'verify',
   initialState,
   reducers:{
      setError:(state, action)=>{
         state.error = action.payload
      },
      clearError:(state)=>{
         state.message = null
         state.status = 'idle'
         state.error = null
      }
   },
   extraReducers:(builder)=>{
      builder
         .addCase(verifyUser.pending, (state)=>{
            state.status = "loading"
            state.error = null
         })
         .addCase(verifyUser.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.message = action.payload.message
         })
         .addCase(verifyUser.rejected, (state, action)=>{
            state.status = 'failed'
            state.error = action.payload
         })
   }
})

export const {setError, clearError} = verifySlice.actions
export default verifySlice.reducer