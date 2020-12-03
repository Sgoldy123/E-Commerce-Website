
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailReducer,productDeleteReducer, productCreateReducer,productUpdateReducer,productReviewCreateReducer} from './reducers/productReducer.js'
import {cartListReducer} from './reducers/cartReducer.js'
import {userLoginReducer, userRegisterReducer,userDetailsReducer,userUpdateProfileReducer,userListReducer, userDeleteReducer, userUpdateReducer} from './reducers/userLoginReducer.js'
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer,orderListReducer,orderDeliverReducer} from './reducers/orderReducer'

const reducer=combineReducers({
    productList:productListReducer,
    productListDetail:productDetailReducer,
    cart:cartListReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer,
    productReviewCreate:productReviewCreateReducer,

});


const cartItemsFromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const shippingAddressFromStorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}




const initialState={
    cart:{cartItems:cartItemsFromStorage,shippingAddress:shippingAddressFromStorage} ,    // intial storage in redux before any action
    userLogin:{userInfo:userInfoFromStorage}
}
const middleware=[thunk]


const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;

