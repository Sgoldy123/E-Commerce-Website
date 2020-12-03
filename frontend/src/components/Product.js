import React from 'react'
import { Card,CardImg } from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'
const Product = ({product}) => {
    return (
        <>
         <Card className="my-12 p-3 rounded">
            
            <Link to={`/product/${product._id}`}>
               <CardImg style={{height:"200px",width:"200px"}} src={product.image} alt="loading..." variant="top"/>
            </Link>
            <Card.Body>
            <Link to={`/product/${product._id}`}>
               <Card.Title  as='div'>
                 <strong>{product.name}</strong>  
               </Card.Title>
               <Card.Text  as='div'>
               <div className="my-2">
                  <Rating value={product.rating} text={product.numReviews}/>
               </div>
               </Card.Text>
               <Card.Text  as='h3'>
                  ${product.price}
               </Card.Text>
            </Link>
            </Card.Body>
            
         </Card> 
        </>
    )
}

export default Product
