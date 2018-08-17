import {RECEIVE_ITEM,RECEIVE_ITEMS} from '../../actions/item_actions';
import {LOGOUT_CURRENT_USER} from '../../actions/session_actions';
import {RECEIVE_USER} from '../../actions/user_actions';
import {merge} from 'lodash';

export default (state={}, action)=>{
  Object.freeze(state);

  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_ITEMS:
      return merge(newState,action.payload.items);//TO BE DECIDED
    case RECEIVE_ITEM:
      return merge(action.payload.items,
          {[action.payload.item.id]:action.payload.item});
    case RECEIVE_USER:
      return action.payload.items || state;//merge(newState, {[action.user.id]:action.user});
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
