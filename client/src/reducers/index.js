import cartOpenReducer from './cartOpen';
import currentCategoryReducer from './currentCategory';
import categoriesReducer from './categories';
import productsReducer from './products';
import shoppingCartReducer from './shoppingCart';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    cartOpen: cartOpenReducer,
    currentCategory: currentCategoryReducer,
    categories: categoriesReducer,
    products: productsReducer,
    shopCart: shoppingCartReducer
});

export default allReducers;
