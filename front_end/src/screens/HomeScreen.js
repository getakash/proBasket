import React, {useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../components/Product'
import {listProducts} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

export default function HomeScreen() {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])

    return (
        <>
            <h1>Latest products</h1>
            {loading ? <Loader /> : error ? <Message variant = 'danger'>{error}</Message> : 
                <Row>
                    {products.map((product) => (
                        <Col sm={12} md={6} lg={4} xl={3}>
                            <Product key={product._id} product={product} />
                        </Col>
                    ))}
                </Row>
            }
        </>
    )
}
