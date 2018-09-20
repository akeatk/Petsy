import * as CartItemUtil from '../util/cart_item_util.js';

export const RECEIVE_CART_ITEMS = 'RECEIVE_CART_ITEMS';
export const RECEIVE_BAD_SUBMIT = 'RECEIVE_BAD_SUBMIT';

const receiveCartItems = payload =>({
  type:RECEIVE_CART_ITEMS,
  payload
});

const receiveBadSubmit = errors =>({
  type:RECEIVE_BAD_SUBMIT,
  errors:errors.responseJSON
});

export const getCartItems=(user_id)=> dispatch=>
  CartItemUtil.getCartItems(user_id)
    .then(payload=>dispatch(receiveCartItems(payload)));

export const createCartItem=cart_item=> dispatch=>
  CartItemUtil.createCartItem(cart_item);

export const updateCartItems=(user_id, cart_items)=> dispatch=>
  CartItemUtil.updateCartItems(user_id,cart_items)
    .then(payload=>dispatch(receiveCartItems(payload)),
      (errors)=>dispatch(receiveBadSubmit(errors)));

export const deleteCartItem=id=> dispatch=>
  CartItemUtil.deleteCartItem(id);
