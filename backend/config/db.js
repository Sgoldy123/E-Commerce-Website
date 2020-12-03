
import mongoose from 'mongoose'


const connectDb=async ()=>{
    try{

        const conn=await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true ,useUnifiedTopology: true});
        console.log(`Database is connected ${conn.connection.host}`.cyan.underline)
           
         
    }catch(Error){
            console.log('error : ',Error.red.underline.bold);
    }
}

export default connectDb;