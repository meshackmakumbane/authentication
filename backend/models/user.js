import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
   firstName:{
      type:String,
      required: true
   },
   lastName:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true,
      unique: true
   },
   password:{
      type:String,
      required:true
   },
   lastLogin:{
      type:Date,
      default: Date.now()
   },
   isVerified:{
      type:Boolean,
      default: false
   },
   verificationToken:String,
   verificationTokenExpiresAt:Date,
   passwordToken:String,
   passwordTokenExpiresAt:Date,
}, {timestamps:true})

export const User = new mongoose.model("User", userSchema)