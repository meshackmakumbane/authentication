import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

export const protect = async (req, res, next)=>{
   const token = req.cookies.token
   try{
      if(!token){
         return res.status(401).json({
            success: false,
            message: "Unauthorised - Invalid token"
         })
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      if(!decoded) return res.status(400).json({success: false, message:'Unauthorised - Invalid token'})

      const user = await User.findById(decoded.id).select('-password')

      if(!user){
         return res.status(401).json({
            success: false,
            message: "User not found"
         })
      }

      req.user = user
      next()
   }catch(err){
      next(err)
   }
}

