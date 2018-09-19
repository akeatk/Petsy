import {LOGOUT_CURRENT_USER} from '../../actions/session_actions';
import {RECEIVE_CART_ITEMS} from '../../actions/cart_item_actions.js';
import {merge} from 'lodash';

export default (state={}, action)=>{
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_CART_ITEMS:
      return action.payload.cart_items;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
