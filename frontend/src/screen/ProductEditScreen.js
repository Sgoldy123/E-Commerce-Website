import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button} from 'react-bootstrap' 
import {useDispatch,useSelector} from 'react-redux'
import  Loader from '../components/Loader.js'
import {listProductDetail,updateProduct} from '../actions/productAction.js'
import FormContainer from '../components/FormContainer.js'
import {PRODUCT_UPDATE_RESET} from '../constant/productConstant'
import axios from 'axios'


const ProductEditScreeen = ({match,location,history}) => {

    const productId=match.params.id

    const [name,setName]=useState('');
    const [price,setPrice]=useState(0);
    const [brand,setBrand]=useState('')
    const [image,setImage]=useState('')
    const [category,setCategory]=useState('');
    const [description,setDescription]=useState('')
    const [countInStock,setCountInStock]=useState(0)
    const [uploading,setUploading]=useState(false)
   
    

    
    
    const dispatch=useDispatch();
  
    const productListDetail=useSelector(state=>state.productListDetail)
    const {loading,error,product}=productListDetail

    const productUpdate=useSelector(state=>state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=productUpdate
    
   
    useEffect( ()=>{
            
           if(successUpdate){
              dispatch({type:PRODUCT_UPDATE_RESET})
              history.push('/admin/productlist')
           }
           else{
                         
            if(!product.name || product._id !==productId )
            {
                dispatch(listProductDetail(productId));
            }else{
               
                setName(product.name)
                setImage(product.image)
                setDescription(product.description)
                setCountInStock(product.countInStock)
                setBrand(product.brand)
                setCategory(product.category)
                setPrice(product.price)

            }
           }

            
        
       
    }, [product,dispatch,history,productId, successUpdate])

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch (updateProduct({
           _id:productId,
           name,
           price,brand,category,description,countInStock,image
        }))
    }

    const uploadingFileHandler=async(e)=>{
      console.log(e.target.files)
      const file=e.target.files[0];
      console.log("#####"+file.name);
      const formData=new FormData();
      formData.append('image',file)
      
      setUploading(true)
      try {
         
         const config={
            headers:{
               'Content-Type':'multipart/form-data'
            }
         }

         const {data}=await axios.post('/api/upload',formData,config)
         setImage(data);
         setUploading(false);

      } catch (error) {
         console.log('$$$',error);
         setUploading(false)
      }

    }

    return (
        <>

        <Link to='/admin/productlist' className='btn btn-light my-3' >Go Back</Link>

        <FormContainer>
             <h1>Edit Product</h1>

             {loadingUpdate && <Loader/>}
             {errorUpdate && <h2>Error Editing</h2>}
             
             {loading ? <Loader/> : error ? <h1>UserNotFound</h1> :(

             <Form onSubmit={submitHandler}>
                 <Form.Group controlId="name">
                    <Form.Label >Name</Form.Label>
                    <Form.Control value={name} onChange={(e)=>setName(e.target.value)} type='name' placeholder='name'></Form.Control>
                 </Form.Group>
                 <Form.Group controlId="price">
                    <Form.Label >Price</Form.Label>
                    <Form.Control value={price} onChange={(e)=>setPrice(e.target.value)} type='number' placeholder='price'></Form.Control>
                 </Form.Group>
                 <Form.Group controlId="category">
                    <Form.Label >Category</Form.Label>
                    <Form.Control value={category} onChange={(e)=>setCategory(e.target.value)} type='text' placeholder='category'></Form.Control>
                 </Form.Group>
                 <Form.Group controlId="brand">
                    <Form.Label >Brand</Form.Label>
                    <Form.Control value={brand} onChange={(e)=>setBrand(e.target.value)} type='text' placeholder='brand'></Form.Control>
                 </Form.Group>
                 <Form.Group controlId="image">
                    <Form.Label >Image</Form.Label>
                    <Form.Control value={image} onChange={(e)=>setImage(e.target.value)} type='text' placeholder='image'></Form.Control>
                    <Form.File id='image-file' label='Choose File' custom  onChange={uploadingFileHandler}></Form.File>
                    {uploading && <Loader/>}
                 </Form.Group>
                 <Form.Group controlId="countinstock">
                    <Form.Label >Stock</Form.Label>
                    <Form.Control value={countInStock} onChange={(e)=>setCountInStock(e.target.value)} type='number' placeholder='countinStock'></Form.Control>
                 </Form.Group>
                 <Form.Group controlId="description">
                    <Form.Label >Description</Form.Label>
                    <Form.Control value={description} onChange={(e)=>setDescription(e.target.value)} type='text' placeholder='description'></Form.Control>
                 </Form.Group>
                <Button variant='primary' type='submit'>Update</Button>
             </Form>

             )}
            

        </FormContainer>
        </>
    )
}

export default ProductEditScreeen
