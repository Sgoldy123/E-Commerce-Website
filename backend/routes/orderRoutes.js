import express from 'express'
const router=express.Router();
import {admin, protect} from '../middleware/authMiddleware.js'
import {addOrderItems,LoggedMyLOrders,getOrderById,updateOrderToPaid,getLOrders,updateOrderToDeliver} from '../controller/orderController.js'

router.route('/').post(protect,addOrderItems).get(protect,admin,getLOrders)

router.route('/myorder').get(protect,LoggedMyLOrders)
router.route('/:id').get(protect,getOrderById)

router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToDeliver)

export default router
