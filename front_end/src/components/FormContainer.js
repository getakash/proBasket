import React from 'react'
import {Col, Row, Container} from 'react-bootstrap'

export default function FormContainer({children}) {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}
