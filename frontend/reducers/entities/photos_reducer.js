import {RECEIVE_ITEM,RECEIVE_ITEMS,RECEIVE_EDIT_ITEM} from '../../actions/item_actions';
import {LOGOUT_CURRENT_USER} from '../../actions/session_actions';
import {RECEIVE_USER} from '../../actions/user_actions';
import {RECEIVE_CART_ITEMS} from '../../actions/cart_item_actions.js';
import {merge} from 'lodash';

export default (state={}, action)=>{
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_EDIT_ITEM:
      return action.payload.photos || {};
    case RECEIVE_ITEMS:
      return action.payload.photos || {};
    case RECEIVE_ITEM:
      return action.payload.photos || {};
    case RECEIVE_USER:
      return merge(newState,action.payload.photos) || {};
    case RECEIVE_CART_ITEMS:
      return action.payload.photos || {};
    default:
      return state;
  }
};
