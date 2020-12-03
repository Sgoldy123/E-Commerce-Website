
import asyncHandler from  'express-async-handler' 
import Order from '../models/orderModel.js'

//@desc create order
//@route POST '/api/orders
//@access private
const addOrderItems=asyncHandler( async(req,res)=>{
    console.log("$$$$$$ 11111");
    const {orderItems,shippingAddress, paymentMethod, itemsPrice, taxPrice, totalPrice, shippingPrice} =req.body;
    // console.log("**SS**",orderItems,shippingAddress, paymentMethod, itemsPrice, taxPrice, totalPrice, shippingPrice)
    if(orderItems && orderItems.length==0){
        res.status(400)
        throw new Error('No order items')
        return
    }
    else{
        const order=new Order({orderItems,user:req.user._id,shippingAddress, paymentMethod, itemsPrice, taxPrice, totalPrice, shippingPrice})

        const orderCreated=await order.save();

        res.status(201).json(orderCreated);
    }

}
)

//@desc Get order by id
//@route GET '/api/orders/:id
//@access private
const getOrderById=asyncHandler( async(req,res)=>{
    console.log("$$$$$$ 222222");

    const order=await Order.findById(req.params.id).populate('user','name email')
    if(order){
        res.json(order);
    }else{
        res.status(404)
        throw new Error("Order Not Found");
    }

}
)

//@desc update Order To Paid
//@route PUT '/api/orders/:id/pay
//@access private
const updateOrderToPaid=asyncHandler( async(req,res)=>{
    console.log("$$$$$$ 33333");

    const order=await Order.findById(req.params.id)
    if(order){
      
        order.isPaid=true
        order.paidAt=Date.now();
        order.paymentResult={
            id: req.body.id,
            status: req.body.status,
            update_time:req.body.update_time ,
            email_address: req.body.payer.email_address,
        }

        const updateOrdered=await order.save();
        res.json(updateOrdered)

    }else{
        res.status(404)
        throw new Error("Order Not Found");
    }

}
)



//@desc update Order To Delivered
//@route PUT '/api/orders/:id/deliver
//@access private
const updateOrderToDeliver=asyncHandler( async(req,res)=>{
    console.log("$$$$$$ 33333");

    const order=await Order.findById(req.params.id)
    if(order){
      
        order.isDelivered=true
        order.deliveredAt=Date.now();
        

        const updateOrdered=await order.save();
        res.json(updateOrdered)

    }else{
        res.status(404)
        throw new Error("Order Not Found");
    }

}
)




//@desc logged in my Order
//@route GET api/orders/myorders
//@access private
const LoggedMyLOrders=asyncHandler( async(req,res)=>{
    
    const myorder = await Order.find({user:req.user._id});
    res.json(myorder);
      
}
)


//@desc logged in Order
//@route GET api/orders/
//@access private/admin
const getLOrders=asyncHandler( async(req,res)=>{
    
    const myorder = await Order.find({}).populate('user','id name');
    res.json(myorder);
      
}
)

export {addOrderItems,getOrderById,updateOrderToPaid, LoggedMyLOrders,getLOrders,updateOrderToDeliver};