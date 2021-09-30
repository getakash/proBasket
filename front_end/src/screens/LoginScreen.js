import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {login} from '../actions/userActions'

export default function LoginScreen({location, history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const loginUser = useSelector(state => state.loginUser)
    const {error, loading, userInfo} = loginUser

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    function submitFormHandler(e){
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message>{error}</Message> }
            {loading && <Loader></Loader> }
            <Form onSubmit= {submitFormHandler}>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email'
                        value={email}
                        placeholder='enter email'
                        required
                        onChange = {(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password'
                        value={password}
                        placeholder='enter password'
                        required
                        onChange = {(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button className='my-2' type='submit' variant='primary'>Sign In</Button>
            </Form>

            <Row>
                <Col>
                    New Customer {' '}
                    <Link to = {redirect ? `/register/?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
