import { configureStore } from '@reduxjs/toolkit'
import signupReducer from '../features/signup/signupSlice'
import verifyReducer from '../features/verify/verifySlice'
import loginReducer from '../features/login/loginSlice'
import userReducer from '../features/dashboard/dashboardSlice'
import forgotPasswordReducer from '../features/reset-password/forgotPasswordSlice'
import resetPasswordReducer from '../features/reset-password/resetPasswordSlice'
import authReducer from '../features/auth/authSlice'

const store = configureStore({
   reducer:{
      auth: authReducer,
      signup: signupReducer,
      verify: verifyReducer,
      login: loginReducer,
      user: userReducer,
      forgotPassword: forgotPasswordReducer,
      resetPassword: resetPasswordReducer
   }
})

export default store