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
            const newState = state.cart.map((item) => item);
            action.payload.products.forEach(item => {
                console.log("ADD MULT", item)
                const isLoaded = newState.findIndex(item2 => item2._id === item._id);
                if (isLoaded === -1) {
                    newState.push(item);
                }                
            })
            return {...state, cart: newState}
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(prod => prod._id !== action.payload.productID)
            }
        case "UPDATE_CART_QUANTITY":
            const index = state.cart.findIndex(item => item._id === action.payload.productID); 
            const newArray = [...state.cart]; 
            console.log("UPDDATE QUANT", newArray);
            console.log("payload", action.payload);
            newArray[index].purchaseQuantity = action.payload.quantity;
            return { ...state, cart: newArray }        
        case "CLEAR_CART":
            return {  
                ...state, 
                cart: []}
        default:
            return state;
    }
}

export default shoppingCartReducer;

