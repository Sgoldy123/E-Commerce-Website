import {ORDER_CREATE_FAIL,ORDER_CREATE_SUCCESS,ORDER_CREATE_REQUEST, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL} from '../constant/orderConstant.js'
import axios from 'axios'

export const orderCreate =(order) => async (dispatch, getState)=>{
   
    
    try {
         
        dispatch ({
            type:ORDER_CREATE_REQUEST
        })

        const {userLogin :{userInfo},}=getState();

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            },
        }
        
        const {data}=await axios.post(`/api/orders`,order,config);
        console.log("##@@ ",data);
       
        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
        })
        
       

    } catch (error) { 
        
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload: 'Invalid Order'
        })

        
    }
}



export const getOrderById =(id) => async (dispatch, getState)=>{
   
    
    try {
         
        dispatch ({
            type:ORDER_DETAILS_REQUEST
        })

        const {userLogin :{userInfo},}=getState();

        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            },
        }
        
        const {data}=await axios.get(`/api/orders/${id}`,config);
        console.log("##@@ ",data);
       
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data
        })
        
       

    } catch (error) { 
        
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload: 'Invalid Order'
        })

        
    }
}



export const payOrder =(orderId,paymentResult) => async (dispatch, getState)=>{
   
    
    try {
         
        dispatch ({
            type:ORDER_PAY_REQUEST
        })

        const {userLogin :{userInfo},}=getState();

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            },
        }
        
        const {data}=await axios.put(`/api/orders/${orderId}/pay`,paymentResult,config);
        console.log("##@@ ",data);
       
        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data
        })
        
       

    } catch (error) { 
        
        dispatch({
            type:ORDER_PAY_FAIL,
            payload: 'Payment Failed'
        })

        
    }
}



export const deliverOrder =(order) => async (dispatch, getState)=>{
   
    
    try {
         
        dispatch ({
            type:ORDER_DELIVER_REQUEST
        })

        const {userLogin :{userInfo},}=getState();

        const config={
            headers:{
               
                Authorization:`Bearer ${userInfo.token}`
            },
        }
        
        const {data}=await axios.put(`/api/orders/${order._id}/deliver`,{},config);
        console.log("##@@ ",data);
       
        dispatch({
            type:ORDER_DELIVER_SUCCESS,
            payload:data
        })
        
       

    } catch (error) { 
        
        dispatch({
            type:ORDER_DELIVER_FAIL,
            payload: 'Payment Failed'
        })

        
    }
}


export const listMyOrder =() => async (dispatch, getState)=>{
   
    
    try {
         
        dispatch ({
            type:ORDER_LIST_MY_REQUEST
        })

        const {userLogin :{userInfo},}=getState();

        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            },
        }
        
        const {data}=await axios.get(`/api/orders/myorder`,config);
        console.log("##@@ ",data);
       
        dispatch({
            type:ORDER_LIST_MY_SUCCESS,
            payload:data
        })
        
       

    } catch (error) { 
        
        dispatch({
            type:ORDER_LIST_MY_FAIL,
            payload: 'MyOrderList cant define'
        })

        
    }
}




export const listOrder =() => async (dispatch, getState)=>{
   
    
    try {
         
        dispatch ({
            type:ORDER_LIST_REQUEST
        })

        const {userLogin :{userInfo},}=getState();

        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            },
        }
        
        const {data}=await axios.get(`/api/orders`,config);
        console.log("##@@ ",data);
       
        dispatch({
            type:ORDER_LIST_SUCCESS,
            payload:data
        })
        
       

    } catch (error) { 
        
        dispatch({
            type:ORDER_LIST_FAIL,
            payload: 'MyOrderList cant define'
        })

        
    }
}