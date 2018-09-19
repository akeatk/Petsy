import * as CartItemUtil from '../util/cart_item_util.js';

export const RECEIVE_CART_ITEMS = 'RECEIVE_CART_ITEMS';

const receiveCartItems = payload =>({
  type:RECEIVE_CART_ITEMS,
  payload
});

export const getCartItems=(user_id)=> dispatch=>
  CartItemUtil.getCartItems(user_id)
    .then(payload=>dispatch(receiveCartItems(payload)));

export const createCartItem=cart_item=> dispatch=>
  CartItemUtil.createCartItem(cart_item);

export const updateCartItems=(user_id, cart_items)=> dispatch=>
  CartItemUtil.updateCartItems(user_id,cart_items);
