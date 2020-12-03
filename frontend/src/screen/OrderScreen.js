import React, { useEffect, useState} from 'react'
import {Row, Col, Form, Button, ListGroup, Image} from 'react-bootstrap' 
import {useDispatch,useSelector} from 'react-redux'
import {Link } from 'react-router-dom'
import {getOrderById,payOrder,deliverOrder} from '../actions/orderAction.js'
import Loader from '../components/Loader.js'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {ORDER_PAY_RESET,ORDER_DELIVER_RESET} from '../constant/orderConstant'



const OrderScreen = ({match,history}) => {

    const orderId=match.params.id;
    const [sdkReady,setSdkReady]=useState(false);
    const dispatch=useDispatch();
    
    const orderDetails=useSelector(state=>state.orderDetails)
    const {order,loading,error}=orderDetails;

    const orderPay=useSelector(state=>state.orderPay)
    const {loading:loadingPay,success:successPay}=orderPay;

    const orderDeliver=useSelector(state=>state.orderDeliver)
    const {loading:loadingDeliver,success:successDeliver}=orderDeliver;

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
   
    if( !loading){
    order.itemsPrice= order.orderItems.reduce((acc,item)=>acc+item.qty * item.price,0 ).toFixed(2)
    
}
    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
       
        const addPaypalScript= async ()=>{ //dynamic javascript making
            const {data:clientId}=await axios.get('/api/config/paypal');
            const script=document.createElement('script')
            script.type='text/javascript'
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async=true
            script.onload=()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }


            if(!order || successPay|| successDeliver)
            {
                dispatch({type:ORDER_PAY_RESET})
                dispatch({type:ORDER_DELIVER_RESET})
                dispatch(getOrderById(orderId));
            }else if(!order.isPaid)
            {
                if(!window.paypal)
                {
                    addPaypalScript();
                }else{
                    setSdkReady(true)
                }
            }
     


       
         
    },[dispatch,orderId,successPay,order,successDeliver])
    
    const successPaymentHandler =(paymentResult)=>{
        console.log('successPaid');
        dispatch(payOrder(orderId,paymentResult))
    }

    const deliverHandler=()=>{
        dispatch(deliverOrder(order));
    }
    


    return (
        <>
         
         {loading ? <Loader/> :error ? <h3>Order Not Found</h3>:
         <>
         <h1>Order Details:</h1>
         <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item >
                        <h2>Shipping</h2>
                        <strong>Name: </strong> {order.user.name} <br/>
                        <strong>Email: </strong> <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
                        <p> <strong>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city} ,{order.shippingAddress.postalCode}, {order.shippingAddress.country} </p>
                        {order.isDelivered ? <h4 style={{color:'blue'}}>order Delivered at {order.deliveredAt}</h4>: <h4 style={{color:'red'}}>Not delivered</h4>}
                    </ListGroup.Item>

                    <ListGroup.Item >
                        <h2>PAyment Method</h2>
                        <p> <strong>Method: </strong> { order.paymentMethod}</p>
                        {order.isPaid ? <h4 style={{color:'blue'}}>Paymeny Done at {order.paidAt}</h4>: <h4 style={{color:'red'}}>Not Pay yet</h4>}
                 
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length===0 ? <p>Empty Cart</p> :
                            (<ListGroup variant='flush'>
                                {order.orderItems.map((item,index)=>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col>
                                                 <Link to={`/product/${item.product}`}> {item.name} </Link>
                                            </Col>
                                            <Col>
                                                {item.qty} x ${item.price} = {item.qty*item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>)
                        }
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={4}>
                <ListGroup>
                     <ListGroup.Item>
                         <h2>Summary</h2>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                             <Col>Items:</Col>
                             <Col>${order.itemsPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                             <Col>Shipping:</Col>
                             <Col>${order.shippingPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                             <Col>Tax:</Col>
                             <Col>${order.taxPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                             <Col>Total Price:</Col>
                             <Col>${order.totalPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     {!order.isPaid && (
                         <ListGroup.Item>
                             {loadingPay && <Loader/>}
                             {!sdkReady ?<Loader/> : (
                                 <PayPalButton amount={order.totalPrice} onSuccess={ successPaymentHandler}/>
                             )}

                         </ListGroup.Item>
                     )}

                     {loadingDeliver && <Loader/>}

                     {
                        userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && 
                         (
                             <ListGroup.Item>
                                 <Button className='btn-block' type='button' onClick={deliverHandler}>
                                     Mark as delivered
                                 </Button>
                             </ListGroup.Item>
                         )
                         
                     }
                </ListGroup>
            </Col>

        </Row>
        </>
        }
        
            
        </>
    )
}

export default OrderScreen
