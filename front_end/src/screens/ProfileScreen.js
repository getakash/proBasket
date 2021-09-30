import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
// import USER_UPDATE_PROFILE_RESET from '../constants/userConstants'

export default function ProfileScreen({location, history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails)  
    const {user, error, loading} = userDetails
    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)  
    const {success} = userUpdateProfile

    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser

    useEffect(() => {
         
        if(!userInfo){
            history.push('/')
        }else{
            if(!user ){
                dispatch(getUserDetails())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[history, userInfo, user, dispatch])

    function submitFormHandler(e){
        e.preventDefault()
        if(password !== confPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(updateUserProfile({name, email, password}))
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h2>Profile</h2>
                {error && <Message variant='danger'>{error}</Message> }
                {message && <Message variant='danger'>{message}</Message> }
                {success && <Message variant='success'>Profile Updated</Message> }
                {loading && <Loader></Loader> }
                <Form onSubmit= {submitFormHandler}>
                    <Form.Group className='my-1' controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type='name'
                            value={name}
                            placeholder='enter your name'
                            onChange = {(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-1' controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                            type='email'
                            value={email}
                            placeholder='enter email'
                            onChange = {(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-1' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type='password'
                            value={password}
                            placeholder='enter password'
                            onChange = {(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-1' controlId='confPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            type='password'
                            value={confPassword}
                            placeholder='confirm password'
                            onChange = {(e) => setConfPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button className='my-1' type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>Orders</h2>
            </Col>
        </Row>
    )
}
