import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'

export default function RegisterScreen({location, history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const registerUser = useSelector(state => state.registerUser)
    const {error, loading, userInfo} = registerUser

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    function submitFormHandler(e){
        e.preventDefault()
        if(password !== confPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message>{error}</Message> }
            {message && <Message>{message}</Message> }
            {loading && <Loader></Loader> }
            <Form onSubmit= {submitFormHandler}>
                <Form.Group className='my-1' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='name'
                        value={name}
                        placeholder='enter your name'
                        required
                        onChange = {(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-1' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email'
                        value={email}
                        placeholder='enter email'
                        required
                        onChange = {(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-1' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password'
                        value={password}
                        placeholder='enter password'
                        required
                        onChange = {(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-1' controlId='confPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type='password'
                        value={confPassword}
                        placeholder='confirm password'
                        required
                        onChange = {(e) => setConfPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button className='my-1' type='submit' variant='primary'>Sign Up</Button>
            </Form>

            <Row>
                <Col>
                    Have an account? {' '}
                    <Link to = {redirect ? `/login/?redirect=${redirect}` : '/login'}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
