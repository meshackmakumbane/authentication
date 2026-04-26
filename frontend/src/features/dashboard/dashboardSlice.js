import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

const initialState = {
   user: null,
   status: "idle",
   isAuthenticated: false
}

export const fetchUser = createAsyncThunk(
   'user/fetchUser',
   async(_, thunkAPI)=>{
      try{
         const res = await api.get("/user/dashboard")
         return res.data
      }catch(err){
         return thunkAPI.rejectWithValue(err.response?.data?.message)
      }
   }
)

export const userSlice = createSlice({
   name:'user',
   initialState,
   reducers:{
      logoutUser:(state)=> {
         state.user = null
         state.status = "idle"
         state.isAuthenticated = false
      }
   },
   extraReducers:(builder)=>{
      builder
         .addCase(fetchUser.pending,(state)=>{
            state.status = "loading"
            state.isAuthenticated = false
         })
         .addCase(fetchUser.fulfilled, (state,action)=>{
            state.status = "succeeded"
            state.isAuthenticated = action.payload.success
            state.user = action.payload.user
         })
         .addCase(fetchUser.rejected, (state,action)=>{
            state.isLoading = "failed"
            state.isAuthenticated = false
         })
   }
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer