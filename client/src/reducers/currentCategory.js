const currentCategoryReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_CATEGORY":
            return state = action.payload.category;
        default:
            return state;
    }
}

export default currentCategoryReducer;