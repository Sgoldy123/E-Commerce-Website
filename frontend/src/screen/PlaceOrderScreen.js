import React, { useEffect} from 'react'
import {Row, Col, Form, Button, ListGroup, Image} from 'react-bootstrap' 
import {useDispatch,useSelector} from 'react-redux'
import CheckoutSceen from '../components/CheckoutSteps.js'
import {Link } from 'react-router-dom'
import {orderCreate} from '../actions/orderAction.js'

const PlaceOrderScreen = ({history}) => {
    const dispatch=useDispatch();
    const cart=useSelector(state=>state.cart)
    cart.itemsPrice= cart.cartItems.reduce((acc,item)=>acc+item.qty * item.price,0 ).toFixed(2)
    cart.shippingPrice = cart.itemsPrice>100 ? 0 :50
    cart.taxPrice=(Number(0.15 * cart.itemsPrice).toFixed(2)); 
    cart.totalPrice = (Number( cart.itemsPrice) + Number (cart.shippingPrice) + Number (cart.taxPrice)).toFixed(2)

    const placeOrderHandler = (e)=>{
      
        e.preventDefault();
       dispatch(orderCreate({
           orderItems:cart.cartItems,
           shippingAddress:cart.shippingAddress,
           paymentMethod:cart.paymentMethod,
           itemsPrice:cart.itemsPrice,
           taxPrice:cart.taxPrice,
           totalPrice:cart.totalPrice
       }))

    }

    const {order,success,error}=useSelector(state=>state.orderCreate)

    useEffect(()=>{
         
        if(success){
            history.push(`/order/${order._id}`)
        }
        

    },[history,success])


    return (
        <>
        <CheckoutSceen step1 step3 step2 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item >
                        <h2>Shipping</h2>
                        <p> <strong>Address: </strong> {cart.shippingAddress.address}, {cart.shippingAddress.city} ,{cart.shippingAddress.postalCode}, {cart.shippingAddress.country} </p>
                    </ListGroup.Item>

                    <ListGroup.Item >
                        <h2>PAyment Method</h2>
                        <p> <strong>Method: </strong> { cart.paymentMethod}</p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length===0 ? <p>Empty Cart</p> :
                            (<ListGroup variant='flush'>
                                {cart.cartItems.map((item,index)=>(
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
                             <Col>${cart.itemsPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                             <Col>Shipping:</Col>
                             <Col>${cart.shippingPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                             <Col>Tax:</Col>
                             <Col>${cart.taxPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                             <Col>Total Price:</Col>
                             <Col>${cart.totalPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         {error && <h3 style={{color:'red'}}>Invalid Order</h3>}
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Button type='button' className='btn-block' disabled={cart.cartItems.length===0} onClick={placeOrderHandler}>Place Your Order</Button>
                     </ListGroup.Item>
                </ListGroup>
            </Col>

        </Row>
            
        </>
    )
}

export default PlaceOrderScreen
