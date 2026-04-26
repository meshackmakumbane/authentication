import crypto from 'crypto'
import bcrypt from "bcryptjs"
import { sendVerificationEmail, 
         sendPasswordResetEmail, 
         sendWelcomeEmail, 
         sendResetPasswordEmail 
} from "../emails/emails.js"
import { User } from "../models/user.js"
import { generateToken } from "../utils/generateToken.js"
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'
import jwt from 'jsonwebtoken'


export const signupController = async(req, res, next)=>{
      const { firstName, lastName, email, password } = req.body
   try {
      if(!firstName || !lastName || !email || !password){
         return res.status(400).json({
            success: false,
            message: "All fields are required"
         })
      }

      const existingUser = await  User.findOne({email})

      if(existingUser){
         return res.status(400).json({
            success: false,
            message: "User already exists"
         })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new User({
         firstName,
         lastName,
         email,
         password:hashedPassword,
         verificationToken: generateToken(),
         verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000
      })
      
      await user.save()
      await sendVerificationEmail(firstName, email, user.verificationToken)

      res.status(200).json({
         success:true,
         message:"Account created successfully, Redirecting to verify your email..."
      })
   } catch (error) {
      next(error)
   }
}

export const verifyEmailController = async(req, res, next)=>{
   const { token } = req.body
   try {
      const user = await User.findOne({
         verificationToken: token,
         verificationTokenExpiresAt: {$gt: Date.now()}
      })

      if(!user){
         return res.status(400).json({
            success: false,
            message: "Invalid or expired code"
         })
      }

      user.isVerified = true
      user.verificationToken = undefined
      user.verificationTokenExpiresAt = undefined

      await user.save()
      await sendWelcomeEmail(user.firstName, user.email)
      res.status(200).json({
         success:true,
         message:"Email verified, Redirecting to log into your account"
      })
   } catch (error) {
      next(error)
   }
}

export const loginController = async(req, res, next)=>{
   const { email, password } = req.body
   try{
      if(!email || !password){
         return res.status(400).json({
            success: false,
            message: "Provide login credentials"
         })
      }

      const user = await User.findOne({email})

      if(!user){
         return res.status(400).json({
            success: false,
            message: "User not found"
         })
      }

      const isMatching = bcrypt.compare(password, user.password)
      if(!isMatching){
         return res.status(400).json({
            success: false,
            message: "Password incorrect"
         })
      }

      user.lastLogin = Date.now()
      await user.save()
      generateTokenAndSetCookie(res, user._id)

      res.status(200).json({
            success: true,
            message: "Logged in successfully"
      })
   }catch(error){
      next(error)
   }
}

export const logoutController = (req, res)=>{
   res.clearCookie("token")
   res.status(200).json({
            success: true,
            message: "Logged out successfully"
      })
}

export const forgotPasswordController = async(req, res, next)=>{
   const { email } = req.body
   try {
      if(!email){
         return res.status(200).json({
            success: false,
            message: "Provide your email"
         })
      }

      const user = await User.findOne({email})
      if(!user){
         return res.status(200).json({
            success: false,
            message: "Email not found"
         })
      }

      const resetToken = crypto.randomBytes(32).toString('hex')
      const expirationDate = Date.now() + 14 * 60 * 1000

      user.passwordToken = resetToken
      user.passwordTokenExpiresAt = expirationDate
      await user.save()
      await sendResetPasswordEmail(user.firstName, user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)
      res.status(200).json({
         success: true,
         message: "Password reset link sent to your email",
         resetToken

      })

   } catch (error) {
      next(error)
   }
}

export const resetPasswordController = async(req, res, next)=>{
   const { token, password } = req.body
   try {
      const user = await User.findOne({
         passwordToken: token,
         passwordTokenExpiresAt:{$gt: Date.now()}
      })

      if(!user){
         return res.status(400).json({
            success: false,
            message: "Invalid token"
         })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      user.password = hashedPassword
      user.passwordToken = undefined
      user.passwordTokenExpiresAt = undefined
      await user.save()
      await sendPasswordResetEmail(user.firstName, user.email)

      res.status(200).json({
            success: true,
            message: "Password reset successfully"
      })
   } catch (error) {
      next(error)
   }
}

export const dashboardController = async(req, res, next)=>{
   const user = req.user
   try {
      res.status(200).json({
         success:true,
         user
   })
   } catch (error) {
      next(error)
   }
}