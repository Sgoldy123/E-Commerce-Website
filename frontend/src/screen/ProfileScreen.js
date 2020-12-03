import React, { useState ,useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Row, Col, Form, Button, Table} from 'react-bootstrap' 
import {useDispatch,useSelector} from 'react-redux'
import  Loader from '../components/Loader.js'
import {getUserDetails,updateUserProfile} from '../actions/userAction.js'
import {listMyOrder} from '../actions/orderAction'

const ProfileScreeen = ({location,history}) => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState(null)
    
    const dispatch=useDispatch();
    const userDetails=useSelector(state=>state.userDetails)
    const {loading,error,user}=userDetails

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
   
    const userUpdateProfile=useSelector(state=>state.userUpdateProfile);
    const {success}=userUpdateProfile

    const orderListMy=useSelector(state=>state.orderListMy)
    const {loading:loadingOrder,error:errorOrder,orders}=orderListMy
    
    
    useEffect( ()=>{
        if(!userInfo)
        {
            history.push('/login')
        }else{
            if(user && !user.name  )
            {
                dispatch(getUserDetails(userInfo._id))
                dispatch(listMyOrder())
            }
            else{
                setEmail(user.email)
                setName(user.name)
            }
        }

    }, [history,dispatch,userInfo,user])

    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(name,email,password,confirmPassword, 'submit');
        if(password !=confirmPassword)
        {
            setMessage('password not matching')
        }else{
           
            dispatch(updateUserProfile({id:user._id,name,email,password}));
        }
        
    }

    return (
        <Row>
            <Col md={3}>
                   
                <h2>User Profile</h2>
                {error && <h4 style={{color:"red"}}> Invalid email or PassWord </h4>}
                {success && <h4 style={{color:"red"}}> Profile Updated </h4>}
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
                    
                    <Button variant='primary' type='submit'>Update</Button>
                </Form>

            </Col>
            <Col md={9}>
                <h3>my Order</h3>
                {loadingOrder ? <Loader/> : errorOrder ?<h3>Cant See the Order Detail </h3> : (
                    <Table responsive striped bordered hover className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th>Details</th>

                            </tr>
                        </thead>
                        <tbody>
                            { orders.map(order=>(
                                <tr key={order._id}>
                                    <td> {order._id} </td>
                                    <td> {order.createdAt.substring(0,10)} </td>
                                    <td> {order.totalPrice} </td>
                                    <td> {order.isPaid ? order.paidAt.substring(0 ,10) :(<i className='fas fa-times' style={{color:'red'}}></i> )} </td>
                                    <td> {order.isDelivered ? order.deliveredAt.substring(0 ,10) :(<i className='fas fa-times' style={{color:'red'}}></i> )} </td>
                                    {/* <td>  <Button className='btn-sm' variant='light'>Details</Button> </td> */}
                                    <td> <LinkContainer to={`/order/${order._id}`}><Button variant='light' className='btn-sm'>Check</Button></LinkContainer> </td>

                                </tr>
                            )) }
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreeen
