import {RECEIVE_USER} from '../../actions/user_actions';
import {RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER} from '../../actions/session_actions';
import {RECEIVE_ITEM} from '../../actions/item_actions';
import {merge} from 'lodash';

export default (state={}, action)=>{
  Object.freeze(state);
  let newState = merge({}, state);
  console.log('user reducer');
  switch(action.type){
    case RECEIVE_USER:case RECEIVE_CURRENT_USER:
        newState[action.user.id]=merge(newState[action.user.id],action.user);
      return newState;
    case RECEIVE_ITEM:
      return merge(newState,{[action.payload.user.id]:action.payload.user});
    case LOGOUT_CURRENT_USER:
      return newState;
    default:
      return state;
  }
};
