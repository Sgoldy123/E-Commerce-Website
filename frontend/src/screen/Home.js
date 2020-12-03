import React, { useEffect } from 'react'
// import products from '../Product'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../actions/productAction.js'
import Loader from '../components/Loader.js'
import MessageError from '../components/MessageError.js'
import Paginating from '../components/Paginating.js'

const Home = ({match}) => {

    const keyword=match.params.keyword
    const pageNumber=match.params.pageNumber||1

    const dispatch=useDispatch();
    
    const productList=useSelector(state=>state.productList);
    const {error,loading,products,page,pages}=productList;
   // console.log("#####",hello);
    useEffect(()=>{
             dispatch(listProducts(keyword,pageNumber))
    },[dispatch,pageNumber,keyword])

    return (
        <>
          <h1 className="latest">Latest List</h1>
          {loading?<Loader/>:error?<MessageError variant='danger' message={error}/>:
          <>
          <Row >
              {
                  products.map(product =>{
                     return( <Col key={product._id} sm={12} md={6} lg={4} xl={3} style={{padding:"10px"}}>
                          <Product product={product}/>
                      </Col>)
                  })
              }
          </Row>
          <Paginating page={page} pages={pages} keyword={keyword ? keyword : ''}/>
          </>
          }
        </>
    )
}

export default Home
