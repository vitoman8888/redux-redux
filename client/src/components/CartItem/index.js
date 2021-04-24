import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { useDispatch } from 'react-redux';
import { removeProductFromCart, updateQuantityInCart } from '../../actions';


const CartItem = ({ item }) => {

    const rxDispatch = useDispatch();

    const removeFromCart = item => {
        rxDispatch(removeProductFromCart(item._id));
        idbPromise('cart', 'delete', { ...item });
    };

    const onChange = (e) => {
        const value = e.target.value;
      
        if (value === '0') {
            rxDispatch(removeProductFromCart(item._id));
            idbPromise('cart', 'delete', { ...item });
        } else {
            rxDispatch(updateQuantityInCart(item._id, parseInt(value)));
            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
        }
    };

    return (
        <div className="flex-row">
        <div>
            <img
            src={`/images/${item.image}`}
            alt=""
            />
        </div>
        <div>
            <div>{item.name}, ${item.price}</div>
            <div>
            <span>Qty:</span>
            <input
                type="number"
                placeholder="1"
                value={item.purchaseQuantity}
                onChange={onChange}
            />
            <span
                role="img"
                aria-label="trash"
                onClick={() => removeFromCart(item)}
            >
                🗑️
            </span>
            </div>
        </div>
        </div>
    );
}

export default CartItem;