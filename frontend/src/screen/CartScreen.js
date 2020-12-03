import React,{ useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form,Button, Card} from 'react-bootstrap'
import { cartListAction,deleteItemFromCart } from '../actions/cartAction.js'
import { CART_ADD_ITEM } from '../constant/cartConstant.js'


const CartScreen = ({match,location, history }) => {

    const cart=useSelector(state=>state.cart)
    const {cartItems}=cart;
    console.log(cartItems);
    const dispatch=useDispatch();
    const productId=match.params.id
    const qty=location.search? Number(location.search.split('=')[1]): 1;
    
    useEffect(()=>{
        if(productId){
            dispatch(cartListAction(productId,qty))
        }
       
    },[productId,dispatch,qty])
  

    const deleteFromCart=(delItem)=>{
        dispatch(deleteItemFromCart(delItem));
    }
    const proceedToBuy =()=>{
        history.push('/login?redirect=shipping')
    }

    return (
        <>
          <Row>
              <Col md={8} >
                  <h1>Shopping Cart </h1>
                  {cartItems.length===0?<h3>cart is empty <Link to='/' style={{color:'blue'}}>Go back</Link></h3> :
                   <ListGroup variant='flush'>
                        
                        {
                            cartItems.map(item=>(
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            {item.price}
                                        </Col>
                                        <Col>
                                                <Form.Control as='select' value={item.qty} onChange={(e)=>dispatch(cartListAction(item.product,Number(e.target.value)))} >
                                                    {
                                                        [...Array(item.countInStock).keys()].map(x=>(
                                                            <option key={x+1} value={x+1} >{x+1}</option>
                                                        ))
                                                    }
                                               </Form.Control>
                                        </Col>
                                        <Col>
                                            <Button variant='light' onClick={()=>deleteFromCart(item.product)}>
                                            <i className="far fa-trash-alt"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))
                        }

                   </ListGroup>
                  }
              </Col>
               
              <Col md={4}>
                   <Card>
                       <ListGroup variant='flush'>
                           
                            <ListGroup.Item>
                                    <h3>SubItem ( {cartItems.reduce((acc,item)=>acc+item.qty,0 ) } ) </h3>
                                    <h4>Total Price : { cartItems.reduce((acc,item)=>acc+item.qty * item.price,0 ).toFixed(2) }</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className="btn btn-block" disabled={cartItems.length===0} onClick={proceedToBuy}>
                                    Buy
                                </Button>
                            </ListGroup.Item>

                       </ListGroup>
                   </Card>
                  
              </Col>
              


          </Row>
        </>
    )
}

export default CartScreen
