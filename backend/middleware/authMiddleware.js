
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protect=asyncHandler( async (req,res,next)=>{

    
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') )
    {
        try {

            token=req.headers.authorization.split(' ')[1] 
          //  console.log("##SASASA  ",token);
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=await User.findById(decode.id).select('-password')
         //   console.log(req.user._id)
            next();
            
        } catch (error) {
            res.status(422)
            throw new Error('Invalid token ,may be token is wrong')
    
            
        }

    }
    if(!token){
         
        res.status(422)
        throw new Error('Invalid token')

    }

})

const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin)
    {
        next();
    }else{
        res.status(401);
        throw new Error('not authorized Admin');
    }
}

export {protect, admin}