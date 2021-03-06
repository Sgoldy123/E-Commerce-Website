import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, Form, Button} from 'react-bootstrap' 
import {useDispatch,useSelector} from 'react-redux'
import  Loader from '../components/Loader.js'
import {register} from '../actions/userAction.js'
import FormContainer from '../components/FormContainer.js'

const RegisterScreeen = ({location,history}) => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState(null)
    
    const dispatch=useDispatch();
    const userRegister=useSelector(state=>state.userRegister)
    //console.log("********* ",userRegister)
    const {loading,error,userInfo}=userRegister

    const redirect=location.search?location.search.split('=')[1]:'/'
    
    useEffect( ()=>{
        if(userInfo)
        {
            history.push(redirect)
        }
    }, [history,redirect,userInfo])

    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(name,email,password,confirmPassword, 'submit');
        if(password !=confirmPassword)
        {
            setMessage('password not matching')
        }else{
            dispatch(register(name,email,password))
        }
        
    }

    return (
        <FormContainer>
             <h1>Sign Up</h1>
             {error && <h4 style={{color:"red"}}> Invalid email or PassWord </h4>}
             {message && <h4 style={{color:"blue"}}> {message} </h4>}
             {loading && <Loader/>}
             <Form onSubmit={submitHandler}>
                 <Form.Group controlId="name">
                    <Form.Label >Name</Form.Label>
                    <Form.Control value={name} onChange={(e)=>setName(e.target.value)} type='name' placeholder='name'></Form.Control>
                 </Form.Group>
                 <Form.Group controlId="email">
                    <Form.Label >Email Address</Form.Label>
                    <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='email'></Form.Control>
                 </Form.Group>
                 <Form.Group controlId="password">
                    <Form.Label >PassWord</Form.Label>
                    <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='password'></Form.Control>
                 </Form.Group>
                 <Form.Group controlId="confirmedPassword">
                    <Form.Label >Confirm PassWord</Form.Label>
                    <Form.Control value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type='password' placeholder='confirm password'></Form.Control>
                 </Form.Group>
                
                <Button variant='primary' type='submit'>SignUp</Button>
             </Form>
             <Row className='py-3'>
                 <Col >
                    Already Registered?{' '}
                     <Link to={redirect?`/login?redirect=${redirect}`:'/login'}>Login</Link>
                 </Col>
             </Row>

        </FormContainer>
    )
}

export default RegisterScreeen
