import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from '../assets/spinner.gif';
import { idbPromise } from "../utils/helpers";
import { useStoreContext } from "../utils/GlobalState";
import Cart from "../components/Cart"
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductsRx, updateQuantityInCart, addProductToCart, removeProductFromCart } from '../actions'

function Detail() {

  const { id } = useParams();
  
  const [currentProduct, setCurrentProduct] = useState({})
  
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  
  const rxCart = useSelector(staterx => staterx.shopCart.cart);
  const rxProducts = useSelector(staterx => staterx.products.prods);
  const rxDispatch = useDispatch();

  
  const addToCart = () => {
    const itemInCart = rxCart.find((cartItem) => cartItem._id === id);
  
    if (itemInCart) {
      rxDispatch(updateQuantityInCart(id, parseInt(itemInCart.purchaseQuantity) + 1));
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      rxDispatch(addProductToCart({ ...currentProduct, purchaseQuantity: 1 }));
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    rxDispatch(removeProductFromCart(currentProduct._id));    
    // upon removal from cart, delete the item from IndexedDB using the `currentProduct._id` to locate what to remove
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  useEffect(() => {
    // already in global store
    if (rxProducts.length) {
      setCurrentProduct(rxProducts.find(product => product._id === id));
    } 
    // retrieved from server
    else if (data) {
      data.products.forEach(prod => rxDispatch(updateProductsRx(prod)));
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        indexedProducts.forEach(prod => rxDispatch(updateProductsRx(prod)));
      });
    }
  }, [rxProducts, data, loading, rxDispatch, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button onClick={addToCart}>
              Add to Cart
            </button>
            <button disabled={!rxCart.find(p => p._id === currentProduct._id)} 
                    onClick={removeFromCart}>
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
          <Cart />
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
    </>
  );
};

export default Detail;
