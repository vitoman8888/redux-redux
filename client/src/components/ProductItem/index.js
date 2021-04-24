import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantityInCart, addProductToCart } from '../../actions'


function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const rxShopCart = useSelector(state => state.shopCart.cart)
  const rxDispatch = useDispatch();

  const addToCart = () => {
    // find the cart item with the matching id
    const itemInCart = rxShopCart.find((cartItem) => cartItem._id === _id);
  
    // if there was a match, call UPDATE with a new purchase quantity
    if (itemInCart) {
      rxDispatch(updateQuantityInCart(_id, parseInt(itemInCart.purchaseQuantity) + 1));
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      rxDispatch(addProductToCart({ ...item, purchaseQuantity: 1 }));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  };
  
  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
