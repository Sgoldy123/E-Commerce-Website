import colors from 'colors'
import dotenv from 'dotenv'
import  users from './data/users.js'
import Product from './data/Product.js'
import User from './models/userModel.js'
import Pproduct from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDb from './config/db.js'

dotenv.config();

connectDb();

const importData=async ()=>{

    try {

        await Order.deleteMany();
        await User.deleteMany();
        await Pproduct.deleteMany();

        const usercreated=await User.insertMany(users);
        console.log(`${usercreated}`.blue);
        const adminUser=usercreated[0]._id;
        const sampleProduct=Product.map(product=>{
            return{
                ...product,
                user:adminUser
            }
        })
        await Pproduct.insertMany(sampleProduct);
        console.log('data is stored'.yellow.underline)
        process.exit();
        
    } catch (error) {
        console.log(`${error}`.red.underline)
       process.exit(1);
    }

}

const destroyData=async ()=>{

    try {

        await Order.deleteMany();
        await User.deleteMany();
        await Pproduct.deleteMany();
        console.log('data is destroyed'.yellow.underline)
        process.exit();
        
    } catch (error) {
        console.log(`${error}`.red.underline)
        process.exit(1);
    }

}

if(process.argv[2]==='-d')
{
    destroyData();
}else{
    importData();
}