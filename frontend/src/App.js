import React from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'
import Home from './screen/Home'
import Product from './screen/Product'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import CartScreen from './screen/CartScreen.js'
import UserScreen from './screen/UserScreeen.js'
import RegisterScreeen from './screen/RegisterScreen.js';
import ProfileScreen from './screen/ProfileScreen'
import ShippingScreen from './screen/ShippingScreen.js';
import PaymentScreen from './screen/PaymentScreen.js'
import PlaceOrderScreen from './screen/PlaceOrderScreen.js'
import OrderScreen from './screen/OrderScreen.js'
import UserListScreen from './screen/UserListScreen.js'
import UserEditScreen from './screen/UserEditScreen.js'
import ProductListScreen from './screen/ProductListScreen'
import ProductEditScreen from './screen/ProductEditScreen'
import OrderListScreen from './screen/OrderListScreen'
const App=()=>{
  return(
    <>
    <Router>
       <Header/>
       <main className="py-3">
       <Container>
             
             <Route path='/' component={Home} exact/>
             <Route path='/search/:keyword' component={Home} exact/>
             <Route path='/page/:pageNumber' component={Home} exact/>
             <Route path='/search/:keyword/page/:pageNumber' component={Home} exact/>
             <Route path='/product/:id' component={Product}/>
             <Route path='/cart/:id?' component={CartScreen}/>
             <Route path='/admin/userlist' component={UserListScreen}/>
             <Route path='/admin/productlist' component={ProductListScreen} exact/>
             <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact/>
             <Route path='/login' component={UserScreen}/>
             <Route path='/register' component ={RegisterScreeen}/>
             <Route path='/profile' component={ProfileScreen}/>
             <Route path='/shipping'  component={ShippingScreen}/>
             <Route path='/payment'  component={PaymentScreen}/>
             <Route path='/placeorder' component={PlaceOrderScreen}/>
             <Route path='/order/:id' component={OrderScreen}/>
             <Route path='/admin/user/:id/edit' component={UserEditScreen} />
             <Route path='/admin/orderlist' component={OrderListScreen} />
             <Route path='/admin/product/:id/edit' component={ProductEditScreen} />

       </Container>
       </main>
       <Footer/>
       </Router>
    </>
  )
}

export default App;
