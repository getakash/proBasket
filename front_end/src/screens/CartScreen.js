import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart, removeFromCart} from '../actions/cartAction'


export default function CartScreen({match, location, history}) {
    const productID = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const dispatch = useDispatch()

    useEffect(() => {
        if(productID){
            dispatch(addToCart(productID, qty))
        }
    }, [dispatch, productID, qty])

    const removeCartItemHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () =>{
        history.push('/login?redirect=shipping')
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>Your Cart is Empty <Link to='/'> Go Back</Link></Message> : 
                    <ListGroup>
                        {cartItems.map(i => (
                            <ListGroup.Item key={i.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={i.image} alt={i.name} fluid rounded></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${i.productID}`}> {i.name}</Link>
                                    </Col>
                                    <Col md={2}>&#8377;{i.price}</Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={i.qty} onChange = {
                                        (e) => dispatch(addToCart(i.productID,e.target.value ))}>
                                            {[...Array(i.countInStock).keys()].map(num => (
                                                <option key ={num+1}> {num+1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={
                                            () => removeCartItemHandler(i.productID)
                                        } >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <h2>
                            Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                            items
                        </h2>
                        &#8377;
                        {cartItems
                            .reduce((acc, item) => acc + item.qty * item.price, 0)
                            .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Button
                            type='button'
                            className='col-12'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}
