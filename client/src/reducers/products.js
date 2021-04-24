const productsReducer = (state = {prods:[]}, action) => {
    console.log("ProductReducer  ", state, action);
    switch (action.type) {
        case "UPDATE_PRODUCTS":
            const newState = state.prods.map((item) => item);
            const isLoaded = newState.findIndex(item2 => item2._id === action.payload.products._id);
            if (isLoaded === -1) {
                newState.push(action.payload.products);
            }                
            return {...state, prods: newState}
        default:
            return state;
    }
}

export default productsReducer;


// UPDATE_PRODUCTS,
