import React from 'react'
//import products from '../Product'
import {Link} from 'react-router-dom'
import { Col, Row, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import {useState, useEffect } from 'react'
import {useDispatch,useSelector}  from 'react-redux'
import {listProductDetail,createProductReview} from '../actions/productAction.js'
import Loader from '../components/Loader'
import MessageError from '../components/MessageError.js'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constant/productConstant'
const Product = ( { history,match}) => {
    
    const [qty,setQty]=useState(1);
    const [rating,setRating]=useState(0);
    const [comment,setComment]=useState('');


    // const history=useHistory()
    const productDetail=useSelector(state=>state.productListDetail);
    const {loading,product,error}=productDetail

    const productReviewCreate =useSelector(state=>state.productReviewCreate);
    const {error:errorProductReview, success:successProductReview}=productReviewCreate

    const userLogin =useSelector(state=>state.userLogin);
    const {userInfo}=userLogin
    
 
    const dispatch=useDispatch();
    useEffect(()=>{
          if(successProductReview){
              alert('Review Sumited')
              setComment('')
              setRating(0)
              dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
          }
        dispatch(listProductDetail(match.params.id))
       
    },[dispatch,match,successProductReview])

    const addOnCart=()=>{
        
        history.push(`/cart/${match.params.id}?qty=${qty}`)

    }

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(createProductReview(match.params.id , {rating,comment}))
    }

    return (

      <>
           
           
             <Link className="btn btn-light" to='/'>Go back</Link>
             {loading?<Loader/>:error?<MessageError variant='danger' message={error}/>:
             <>
             <Row>
                 <Col md={6}>
                       <Image src={product.image} fluid alt={product.name}></Image>
                 </Col>
                 <Col md={3}>
                     <ListGroup variant="flush">
                         <ListGroup.Item >
                             {product.name}
                         </ListGroup.Item>
                         <ListGroup.Item >
                             Description:{product.description}
                         </ListGroup.Item>
                         <ListGroup.Item>
                             <Rating value={product.rating} text={`${product.numReviews}`}/>
                         </ListGroup.Item>
                         <ListGroup.Item>
                             Price: ${product.price}
                         </ListGroup.Item>
                     </ListGroup>
                 </Col>
                 <Col md={3}>
                     <ListGroup>
                         <ListGroup.Item>
                             Price: ${product.price}
                         </ListGroup.Item>
                         <ListGroup.Item>
                             { product.countInStock >0 ?'In Stock' : 'Out Stock'}
                         </ListGroup.Item>
                        { product.countInStock>0 && <ListGroup.Item>
                             <Row>
                                 <Col>Qty:</Col>
                                 <Col>
                                     <Form.Control as='select' onChange={(e)=>setQty(e.target.value)} >
                                          {
                                              [...Array(product.countInStock).keys()].map(x=>(
                                                  <option key={x+1} value={x+1} >{x+1}</option>
                                              ))
                                          }
                                     </Form.Control>
                                 </Col>
                             </Row>
                         </ListGroup.Item>
                         }
                         <ListGroup.Item>
                             <Button className="btn btn-block btn-dark"  disabled={!product.countInStock} onClick={addOnCart}  >Add to Cart</Button>
                         </ListGroup.Item>
                     </ListGroup> 
                 </Col>
               
             </Row>
             <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length===0 && <h3>No Reviews</h3>}
                    <ListGroup variant='flush'>
                        {product.reviews.map(review=>(
                            <ListGroup.Item key={review._id}>
                               <strong>{review.name}</strong>
                               <Rating value={review.rating}/>
                               <p>{review.createdAt.substr(0,10)}</p>
                               <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h4>Write a comments</h4>
                            {errorProductReview && <h4>Already Reviewed..</h4>}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                                            <option value=''>select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                         <Form.Label>Comment</Form.Label>
                                         <Form.Control as='textarea' row ='3' value={comment} onChange={(e)=>setComment(e.target.value)}>

                                         </Form.Control>
                                    </Form.Group>
                                    <Button type='submit' variant='primary'>Submit</Button>
                                </Form>
                            ): <h5>Please <Link to='/login'>SignIn</Link> </h5>}
                        </ListGroup.Item>
                    </ListGroup>
                </Col> 
             </Row>
             </>
             
            }

      </>
    )

}

export default Product
