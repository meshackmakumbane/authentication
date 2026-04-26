import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (res, userId)=>{
   const token = jwt.sign({id:userId}, process.env.JWT_SECRET_KEY,{
      expiresIn: "1d"
   })

   res.cookie("token", token,{
      httpOnly: true,
      secure: true,
      sameSite: 'None'
   })
}