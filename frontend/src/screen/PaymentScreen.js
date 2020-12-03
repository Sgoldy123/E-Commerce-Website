import React, { useState} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap' 
import {useDispatch,useSelector} from 'react-redux'
import {savePaymentMethod} from '../actions/cartAction.js'
import FormContainer from '../components/FormContainer.js'
import CheckoutSceen from '../components/CheckoutSteps.js'

const PaymentScreen = ({history}) => {

    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart

    if(!shippingAddress)
    {
        history.push('/shipping')
    }
    
    const [paymentMethod,setPaymentMethod]=useState('PayPal')
    

    const dispatch=useDispatch();

    const submitHandler=(e)=>{
        e.preventDefault();
        
        dispatch(savePaymentMethod(paymentMethod))
        //console.log(paymentMethod)
        history.push('/placeorder')
    }
    return (
        <>
         <CheckoutSceen step1 step2 step3/>
        <FormContainer>
           
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Payment</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='Paypal or credit card' id='PayPal' value='PayPal' checked name='paymentMethod' onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                        <Form.Check type='radio' label='Stripe' id='Stripe' value='Stripe'  name='paymentMethod' onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                </Form.Group>
               <Button variant='primary' type='submit'>Payment</Button>    
            </Form>
        </FormContainer>
        </>
    )
}

export default PaymentScreen
