import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';
import { addMultipleProductsToCart, toggleCartRx } from '../../actions';
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {

    const rxCartOpen = useSelector(state => state.cartOpen);
    const rxShopCart = useSelector(state => state.shopCart.cart)
    const rxDispatch = useDispatch();

    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        if (data) {
          stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
          });
        }
    }, [data]);
    
    useEffect(() => {
        async function getCart() {
          const cart = await idbPromise('cart', 'get');
          //dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
          rxDispatch(addMultipleProductsToCart(cart))
        };
      
        if (!rxShopCart.length) {
          getCart();
        }
    }, [rxShopCart.length, rxDispatch]);

    function toggleCart() {
        rxDispatch(toggleCartRx());
    }

    function calculateTotal() {
        let sum = 0;
        rxShopCart.forEach(item => {
          sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {
        const productIds = [];
      
        rxShopCart.forEach((item) => {
          for (let i = 0; i < item.purchaseQuantity; i++) {
            productIds.push(item._id);
          }
        });

        getCheckout({
            variables: { products: productIds }
        });
    }

    if (!rxCartOpen) {
        return (
          <div className="cart-closed" onClick={toggleCart}>
            <span
              role="img"
              aria-label="trash">🛒</span>
          </div>
        );
    }

    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>[close]</div>
            <h2>Shopping Cart</h2>
            {rxShopCart.length ? (
                <div>
                {rxShopCart.map(item => (
                    <CartItem key={item._id} item={item} />
                ))}
                <div className="flex-row space-between">
                    <strong>Total: ${calculateTotal()}</strong>
                    {
                    Auth.loggedIn() ?
                        <button onClick={submitCheckout} >
                        Checkout
                        </button>
                        :
                        <span>(log in to check out)</span>
                    }
                </div>
                </div>
            ) : (
                <h3>
                <span role="img" aria-label="shocked">
                    😱
                </span>
                You haven't added anything to your cart yet!
                </h3>
            )}
        </div>
    );
};

export default Cart;