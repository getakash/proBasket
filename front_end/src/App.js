import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import './bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} ></Route>
          <Route path='/profile' component={ProfileScreen} ></Route>
          <Route path='/shipping' component={ShippingScreen} ></Route>
          <Route path='/register' component={RegisterScreen} ></Route>
          <Route path='/product/:id' component={ProductScreen} ></Route>
          <Route path='/cart/:id?' component={CartScreen} ></Route>
          <Route path='/' component={HomeScreen} exact></Route>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
