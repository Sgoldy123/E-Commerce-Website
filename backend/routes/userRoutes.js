import express from 'express'
const router=express.Router();
import {authUser,getUserById,updateUserById,getUserProfile,registerUser,updateUserProfile,getUsers, deleteUser} from '../controller/userController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect,admin,getUsers)
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUserById)
router.route('/login').post(authUser)
router.route('/profile').get(protect ,getUserProfile).put(protect,updateUserProfile);



export default router