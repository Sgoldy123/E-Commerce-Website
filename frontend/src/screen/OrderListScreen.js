import React, {useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap' 
import {useDispatch,useSelector} from 'react-redux'
import  Loader from '../components/Loader.js'
import {listOrder } from '../actions/orderAction'

const OrderListScreen = ({history}) => {

    const dispatch=useDispatch();

    const orderList=useSelector(state=>state.orderList)
    const {loading, orders, error} =orderList;


    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo} =userLogin;

    


    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
        dispatch(listOrder());
    }else{

        history.push('/login')

    }
    },[dispatch,userInfo,history])

   

    return (
        <>
            <h1>Orders:</h1>
            {loading ? (<Loader/>) : error ?<h2>Admin not Authorized </h2> :
            (<Table striped hover responsive bordered className='table-sm'>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>DATE</td>
                        <td>TOTAL</td>
                        <td>PAID</td>
                        <td>DELIVERED</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    { orders &&  orders.map(order=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>{order.totalPrice}</td>
                            <td> {order.isPaid ? (order.paidAt.substring(0,10)) : (<i className='fas fa-times' style={{color:'red'}}/>) }</td>
                            <td> {order.isDelivered ? (order.deliveredAt.substring(0,10)) : (<i className='fas fa-times' style={{color:'red'}}/>) }</td>

                             <td>
                                 <LinkContainer to={`/order/${order._id}`}>
                                     <Button variant='light' className='btn-sm' >
                                         Detail
                                     </Button>
                                 </LinkContainer>
                                
                             </td>
                        </tr>
                    ))}
                </tbody>
            </Table>)
            }
        </>
    )
}

export default OrderListScreen
