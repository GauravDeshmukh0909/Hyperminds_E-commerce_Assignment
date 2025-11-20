import mongoose from "mongoose";


const connectMongoDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
        console.log(`\n mongodb connected db host ${connectionInstance.connection.host}`);
        
    } catch (error) {
      console.error(`error connection to mongodb :${error.message}`)
      process.exit(1);
        
    }
}


export default connectMongoDB