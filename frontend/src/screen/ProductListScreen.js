import React, {useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button,Row ,Col} from 'react-bootstrap' 
import {useDispatch,useSelector} from 'react-redux'
import  Loader from '../components/Loader.js'
import {listProducts,deleteProduct,createProduct } from '../actions/productAction'
import {PRODUCT_CREATE_RESET} from '../constant/productConstant'
import Paginating from '../components/Paginating.js'
const ProductListScreen = ({history,match}) => {
    
    const pageNumber=match.params.pageNumber||1
    const dispatch=useDispatch();

    const productList=useSelector(state=>state.productList)
    const {loading, products, error,page,pages} =productList;
    
    const productDelete=useSelector(state=>state.productDelete)
    const {loading:loadingDelete,error:errorDelete,success:successDelete} =productDelete;

    const productCreate=useSelector(state=>state.productCreate)
    const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct} =productCreate;

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo} =userLogin;

    

    useEffect(()=>{

        dispatch({type:PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
          
            history.push('/login')
         }
         
         if(successCreate){
             history.push(`/admin/product/${createdProduct._id}/edit`)
         }
         else{
            dispatch(listProducts('',pageNumber));
         }

    },[dispatch,userInfo,history,successDelete,successCreate, createdProduct,pageNumber])

    const deleteHandler=(id)=>{
       if( window.confirm('are you sure')){
         dispatch(deleteProduct(id))
    }
    }
    const createProductHandler=()=>{
        dispatch(createProduct())
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i>Create Product
                    </Button>
                </Col>
            </Row>
            
            {loadingDelete && <h2>Loading...</h2>}
            {errorDelete && <h3>Some error</h3>}
            {loadingCreate && <h2>Loading...</h2>}
            {errorCreate && <h3>Some error</h3>}
            {loading ? (<Loader/>) : error ?<h2>Admin not Authorized </h2> :
            (
                <>
                <Table striped hover responsive bordered className='table-sm'>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Category</td>
                        <td>Price</td>
                        <td>Brand</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    { products &&  products.map(product=>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>{product.brand}</td>
                            
                           
                             <td>
                                 <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                     <Button variant='light' className='btn-sm' >
                                         <i className='fas fa-edit'></i>
                                     </Button>
                                 </LinkContainer>
                                 <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                                     <i className='fas fa-trash'></i>
                                 </Button>
                             </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginating page={page} pages={pages} isAdmin={true}/>
            </>)
            }
        </>
    )
}

export default ProductListScreen
