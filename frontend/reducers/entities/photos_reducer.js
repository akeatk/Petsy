import {RECEIVE_ITEM,RECEIVE_ITEMS} from '../../actions/item_actions';
import {LOGOUT_CURRENT_USER} from '../../actions/session_actions';
import {RECEIVE_USER} from '../../actions/user_actions';
import {merge} from 'lodash';

export default (state={}, action)=>{
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_ITEMS:
      return action.payload.photos || {};
    case RECEIVE_ITEM:
      return action.payload.photos || {};//get rid of or after you seed data
    case RECEIVE_USER:
      return merge(newState,action.payload.photos);
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
