const categoriesReducer = (state = {cats:[]}, action) => {
    switch (action.type) {
        case "UPDATE_CATEGORIES":
            const isLoaded = state.cats.findIndex(item => item._id === action.payload.categories._id);
            if (isLoaded > -1) {
                return state;
            } else {
                return {  
                    ...state, 
                    cats: [...state.cats, action.payload.categories]}
            }
        default:
            return state;
    }
}

export default categoriesReducer;


