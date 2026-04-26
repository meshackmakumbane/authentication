import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

const initialState = {
   message: null,
   status:'idle',
   isAuthenticated: false,
   error:null
}

export const loginUser = createAsyncThunk(
   'user/loginUser',
   async(userData, thunkAPI)=>{
      try{
         const res = await api.post('user/login', userData)
         return res.data
      }catch(err){
         return thunkAPI.rejectWithValue(err.response?.data?.message || "Couldn't log in the user")
      }
   }
)

export const loginSlice = createSlice({
   name: 'login',
   initialState,
   reducers:{
      setError:(state, action)=>{
         state.error = action.payload
      },
      clearError:(state)=>{
         state.error = null
      },
      setCredentials:()=>{
         state.user = action.payload.user
         state.status = 'succeeded'
      }
   },
   extraReducers:(builder)=>{
      builder
         .addCase(loginUser.pending, (state)=>{
            state.status = 'loading'
            state.error = null 
         })
         .addCase(loginUser.fulfilled, (state,action)=>{
            state.status = 'succeeded'
            state.message = action.payload.message
            state.isAuthenticated = action.payload.success
         })
         .addCase(loginUser.rejected, (state,action)=>{
            state.status = 'failed'
            state.error = action.payload
         })
   }
})

export const { setError, clearError, setCredentials } = loginSlice.actions
export default loginSlice.reducer