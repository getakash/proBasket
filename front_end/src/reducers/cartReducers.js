import {ADD_CART_ITEM, REMOVE_CART_ITEM} from '../constants/cartConstants'

const cartReducer = (state = { }, action) => {
    switch(action.type){
        case ADD_CART_ITEM:
            const itemToAdd = action.payload

            const existedItem = state.cartItems.find(i => i.productID === itemToAdd.productID)

            if(existedItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.productID === itemToAdd.productID ? itemToAdd : i)
                }
            }else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, itemToAdd]
                }
            }
        case REMOVE_CART_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter((i) => i.productID !== action.payload)
            }
        default:
            return state    
    }
}

export default cartReducer