import {ADD_CART_ITEM, REMOVE_CART_ITEM} from '../constants/cartConstants'
import axios from 'axios'

export const addToCart = (id, qty) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type: ADD_CART_ITEM,
        payload: {
            productID: data._id,
            image: data.image,
            name: data.name,
            price: data.price,
            countInStock: data.countInStock,
            qty: qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}