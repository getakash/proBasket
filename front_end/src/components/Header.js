import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {logout} from '../actions/userActions'

export default function Header() {
    const dispatch = useDispatch();

    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser

    function logoutHandler(){
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand >ProBasket</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className="ms-auto my-2 my-lg-0"
                    // style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                    <LinkContainer to='/cart'>
                        <Nav.Link ><i className='fas fa-shopping-cart mx-1'></i>Cart</Nav.Link>
                    </LinkContainer>
                    {userInfo ?  
                        <NavDropdown title={userInfo.name} id='collasible-nav-dropdown'>
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        : 
                        <LinkContainer to='/login'>
                            <Nav.Link ><i className='fas fa-user mx-1'></i>Sign In</Nav.Link>
                        </LinkContainer>
                    }
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
    )
}
