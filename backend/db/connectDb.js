import mongoose from 'mongoose'

const connectDb = async()=>{
   try{
      const connection = mongoose.connect(process.env.MONGODB)
      console.log('Connected to database')
   }catch(err){
      console.log('Failed to connect to database :' + err.message)
      process.exit(1)
   }
}

export default connectDb