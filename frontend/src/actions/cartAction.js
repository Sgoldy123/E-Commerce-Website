
import {CART_ADD_ITEM,CART_DELETE_ITEM,CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD} from '../constant/cartConstant'
import axios from 'axios'

export const cartListAction=(id,qty)=>async(dispatch,getState)=>{


    const {data}=await axios.get(`/api/products/${id}`);
    dispatch({
        type:CART_ADD_ITEM,
        payload:{ 
            product:data._id,
            name:data.name,
            image:data.image,
            countInStock:data.countInStock,
            price:data.price,
            qty
        }
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))  //get cartItem from cartReducer bcs defined, cart:cartReducer in store

}

export const deleteItemFromCart=(id)=>async(dispatch,getState)=>{
    dispatch({
        type:CART_DELETE_ITEM,
        payload:id
    })
    
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAdrressFromCart=(data)=>async(dispatch)=>{
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    })
    
    localStorage.setItem('shippingAddress',JSON.stringify(data));
}

export const savePaymentMethod=(data)=>async(dispatch)=>{
    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload:data
    })
    
    localStorage.setItem('savePaymentMethod',JSON.stringify(data));
}