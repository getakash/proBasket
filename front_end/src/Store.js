import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import productListReducer, {productDetailsReducer} from './reducers/productReducers'
import cartReducer from './reducers/cartReducers'
import {userLoginReducer, userRegisterReducer, 
        userDetailsReducer, userUpdateProfileReducer} from './reducers/userReducers'

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = (localStorage.getItem('userInfo') && localStorage.getItem('userInfo') !== undefined) ? JSON.parse(localStorage.getItem('userInfo')) : null


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    loginUser: userLoginReducer,
    registerUser: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
});

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },
    loginUser: {
        userInfo: userInfoFromStorage,
    },
};

const Store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default Store;