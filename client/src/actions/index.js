const toggleCartRx = () => {
    return {
        type: 'TOGGLE_CART'
    };
}

const setCategoryRx = (catName) => {
    return {
        type: 'SET_CATEGORY',
        payload: {
            category: catName
        }
    };
}

const updateProductsRx = (newProds) => {
    return {
        type: 'UPDATE_PRODUCTS',
        payload: {
            products: newProds
        }
    };
}

const updateCategoriesRx = (newCats) => {
    return {
        type: 'UPDATE_CATEGORIES',
        payload: {
            categories: newCats
        }
    };
}

const addProductToCart = (newProd) => {
    return{
        type: 'ADD_TO_CART',
        payload: {
            product: newProd
        }
    }
}

const addMultipleProductsToCart = (newProds) => {
    return{
        type: 'ADD_MULTIPLE_TO_CART',
        payload: {
            products: newProds
        }
    }
}

const removeProductFromCart = (prodId) => {
    return{
        type: 'REMOVE_FROM_CART',
        payload: {
            productID: prodId
        }
    }
}

const updateQuantityInCart = (prodId, newQuantity) => {
    return{
        type: 'UPDATE_CART_QUANTITY',
        payload: {
            productID: prodId,
            quantity: newQuantity
        }
    }
}

const clearCart = () => {
    return{
        type: 'CLEAR_CART'
    }
}

export { 
    toggleCartRx, 
    setCategoryRx, 
    updateProductsRx, 
    updateCategoriesRx, 
    addProductToCart, 
    addMultipleProductsToCart, 
    removeProductFromCart, 
    updateQuantityInCart, 
    clearCart  
}