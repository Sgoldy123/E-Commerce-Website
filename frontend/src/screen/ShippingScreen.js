import React, { useState} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap' 
import {useDispatch,useSelector} from 'react-redux'
import {saveShippingAdrressFromCart} from '../actions/cartAction.js'
import FormContainer from '../components/FormContainer.js'
import CheckoutSceen from '../components/CheckoutSteps.js'

const ShippingScreen = ({history}) => {

    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    
    const [address,setAddress]=useState(shippingAddress.address)
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode)
    const [city,setCity]=useState(shippingAddress.city)
    const [country,setCountry]=useState(shippingAddress.country)

    const dispatch=useDispatch();

    const submitHandler=(e)=>{
        e.preventDefault();
        // console.log("submit....",address,postalCode,city,country)
        dispatch(saveShippingAdrressFromCart({address,postalCode,city,country}));
        history.push('/payment')
    }
    return (
        <>
         <CheckoutSceen step1 step2/>
        <FormContainer>
           
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                        <Form.Label >Address</Form.Label>
                        <Form.Control value={address} onChange={(e)=>setAddress(e.target.value)} required type='text' placeholder='Address'></Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode">
                        <Form.Label >PostalCode</Form.Label>
                        <Form.Control value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} required type='text' placeholder='PostalCode'></Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                        <Form.Label >City</Form.Label>
                        <Form.Control value={city} onChange={(e)=>setCity(e.target.value)} type='text' required placeholder='City'></Form.Control>
                </Form.Group>
                <Form.Group controlId="country">
                        <Form.Label >Country</Form.Label>
                        <Form.Control value={country} onChange={(e)=>setCountry(e.target.value)} type='text' required placeholder='Country'></Form.Control>
                </Form.Group>

                 <Button variant='primary' type='submit'>Continue</Button>    
            </Form>
        </FormContainer>
        </>
    )
}

export default ShippingScreen
