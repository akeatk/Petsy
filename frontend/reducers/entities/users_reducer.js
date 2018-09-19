import {RECEIVE_USER} from '../../actions/user_actions';
import {RECEIVE_CURRENT_USER} from '../../actions/session_actions';
import {RECEIVE_ITEM,RECEIVE_ITEMS} from '../../actions/item_actions';
import {RECEIVE_CART_ITEMS} from '../../actions/cart_item_actions.js';
import {merge} from 'lodash';

export default (state={}, action)=>{
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_USER:
      return merge(newState,{[action.payload.user.id]:action.payload.user});
    case RECEIVE_CURRENT_USER:
      newState[action.user.id]=merge(newState[action.user.id],action.user);
      return newState;
    case RECEIVE_ITEMS:
      return merge(newState,action.payload.users);
    case RECEIVE_ITEM:
      return merge(newState,{[action.payload.user.id]:action.payload.user});
    case RECEIVE_CART_ITEMS:
      return merge(newState,action.payload.users);
    default:
      return state;
  }
};
