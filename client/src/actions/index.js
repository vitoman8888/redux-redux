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

export { toggleCartRx, setCategoryRx, updateProductsRx, updateCategoriesRx }