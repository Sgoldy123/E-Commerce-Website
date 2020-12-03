import asyncHandler from  'express-async-handler' 
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//@desc Auth user & get Token
//@route post '/api/users/login
//@access public
const authUser=asyncHandler ( async(req,res)=>{
    const {email,password}=req.body;
    const user= await User.findOne({email})
    
     
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        
        res.status(422)
        throw new Error('invalid email or password');
    }
})


//@desc Auth user & post Token
//@route post '/api/users
//@access public
const registerUser= asyncHandler (async(req,res)=>{

    const {name,email,password}=req.body;
    const userExist=await User.findOne({email});
    if(userExist){
        res.status(400)
        throw new Error('Email already exists')
    }else{
        const user=await User.create({
            name,
            email,
            password
        })
        if(user)
        {
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user._id)
            })

        }
        else{
            res.status(400)
            throw new Error('invalid email or password');
        }
    }


})





//@desc Auth user & get Token
//@route get '/api/users/profile
//@access private
const getUserProfile=asyncHandler ( async(req,res)=>{
   
    const user =await User.findById(req.user._id)
    
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }
    else{
        res.status(422)
        throw new Error('user email3 not Found');
    }

})

//@desc Auth user & get Token
//@route PUT '/api/users/profile
//@access private
const updateUserProfile=asyncHandler ( async(req,res)=>{
   
    const user =await User.findById(req.user._id)
    
    if(user){
        user.name=req.body.name||user.name
        user.email=req.body.email||user.email
        if(req.body.password)
        {
            user.password=req.body.password
        }
        const userUpdate=await user.save();
        res.json({
            _id:userUpdate._id,
            name:userUpdate.name,
            email:userUpdate.email,
            isAdmin:userUpdate.isAdmin,
            token:generateToken(userUpdate._id)
        })
    }
    else{
        res.status(422)
        throw new Error('user email2 not Found');
    }

})



//@desc Auth get all user admin
//@route get '/api/users
//@access private/admin
const getUsers=asyncHandler ( async(req,res)=>{
   
    const users =await User.find({});
    res.json(users);
})


//@desc Auth delete User
//@route get '/api/users/:id
//@access private/admin
const deleteUser=asyncHandler ( async(req,res)=>{
   
    const user =await User.findById(req.params.id);

    if(user)
    {
        await user.remove();
        res.json({message:'delete user successfully'});
    }else{
        res.status(404);
        throw new Error('user email1 not found');
    }
    

})



//@desc Auth get user
//@route get '/api/users/:id
//@access private/admin
const getUserById=asyncHandler ( async(req,res)=>{
   
    const user =await User.findById(req.params.id).select('-password')
    if(user)
    {
        res.json(user);
    }else{
        res.status(404);
        throw new Error('user email not found');
    }
})


//@desc Auth update user
//@route PUT '/api/users/:id
//@access private/admin
const updateUserById=asyncHandler ( async(req,res)=>{
   
    const user =await User.findById(req.params.id)
    
    if(user){
        user.name=req.body.name||user.name
        user.email=req.body.email||user.email
        user.isAdmin=req.body.isAdmin
        
        const userUpdate=await user.save();
        res.json({
            _id:userUpdate._id,
            name:userUpdate.name,
            email:userUpdate.email,
            isAdmin:userUpdate.isAdmin,
            
        })
    }
    else{
        res.status(422)
        throw new Error('user not Found');
    }

})





export {authUser,getUserProfile,registerUser, updateUserProfile,getUsers, deleteUser, getUserById, updateUserById};