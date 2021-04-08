//import
// change require into import like ReactJS we have to use a json  we will use in json **** "type": "module" ******

import express from 'express';
import path from 'path'
const app= express();
import morgan from 'morgan'
// import Product from './data/Product.js' 
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoute.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
dotenv.config();



//db
connectDb();


//middleware

if(process.env.NODE_X==='Development'){
    app.use(morgan('dev'))
}
app.use(cors());
app.use(express.json());


//routes
app.get('/',(req,res)=>{
    res.send('checking Server')
})

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);

app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID));


const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

app.use(notFound);

app.use(errorHandler);





//server
const PORT=process.env.PORT;
const develop=process.env.NODE_X;
app.listen('5000',()=>console.log(`server ${develop} is running at  ${PORT}`.cyan.underline));