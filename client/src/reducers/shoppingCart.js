const shoppingCartReducer = (state = {cart:[]}, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const isLoaded = state.cart.findIndex(item => item._id === action.payload.product._id);
            if (isLoaded > -1) {
                return state;
            } else {
                return {  
                    ...state, 
                    cart: [...state.cart, action.payload.product]}
            }
        case "ADD_MULTIPLE_TO_CART":
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(prod => prod._id !== action.payload.id)
            }
        case "UPDATE_CART_QUANTITY":
        case "CLEAR_CART":
            return {  
                ...state, 
                cart: []}
        default:
            return state;
    }
}

export default shoppingCartReducer;
//  ADD_TO_CART, 
//  ADD_MULTIPLE_TO_CART, 
//  REMOVE_FROM_CART, 
//  UPDATE_CART_QUANTITY, 
//  CLEAR_CART, 
