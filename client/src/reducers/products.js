const productsReducer = (state = {prods:[]}, action) => {
    console.log("ProductReducer  ", state, action);
    switch (action.type) {
        case "UPDATE_PRODUCTS":
            return {  
                ...state, 
                prods: [...state.prods, action.payload.products]}
        default:
            return state;
    }
}

export default productsReducer;


// UPDATE_PRODUCTS,
