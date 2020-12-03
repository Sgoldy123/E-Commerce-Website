import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, Form, Button} from 'react-bootstrap' 
import {useDispatch,useSelector} from 'react-redux'
import  Loader from '../components/Loader.js'
import {login} from '../actions/userAction.js'
import FormContainer from '../components/FormContainer.js'

const UserScreeen = ({location,history}) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    
    const dispatch=useDispatch();
    const userLogin=useSelector(state=>state.userLogin)
    console.log("********* ",userLogin)
    const {loading,error,userInfo}=userLogin 

    const redirect=location.search?location.search.split('=')[1]:'/'
    
    useEffect( ()=>{
        if(userInfo)
        {
            history.push(redirect)
        }
    }, [history,redirect,userInfo])

    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(email,password, 'submit');
        dispatch(login(email,password))
    }

    return (
        <FormContainer>
             <h1>Sign IN</h1>
             {error && <h4 style={{color:"red"}}> Invalid email or PassWord </h4>}
             {loading && <Loader/>}
             <Form onSubmit={submitHandler}>
                 <Form.Group controlId="email">
                    <Form.Label >Email Address</Form.Label>
                    <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='email'></Form.Control>
                 </Form.Group>
                 <Form.Group controlId="password">
                    <Form.Label >PassWord</Form.Label>
                    <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='password'></Form.Control>
                 </Form.Group>
                
                <Button variant='primary' type='submit'>SignIn</Button>
             </Form>
             <Row className='py-3'>
                 <Col >
                     New Register?{' '}
                     <Link to={redirect?`/register?redirect=${redirect}`:'/register'}>Register Here</Link>
                 </Col>
             </Row>

        </FormContainer>
    )
}

export default UserScreeen
