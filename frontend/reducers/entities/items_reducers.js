import {RECEIVE_ITEM} from '../../actions/item_actions';
import {RECEIVE_USER} from '../../actions/session_actions';
import {merge} from 'lodash';

export default (state={}, action)=>{
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_USER:
      return merge(newState, {[action.user.id]:action.user});
    case RECEIVE_CURRENT_USER:
      return newstate;//merge(newState, action.items);
    default:
      return state;
  }
};
