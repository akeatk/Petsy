import {RECEIVE_ITEM,RECEIVE_ITEMS} from '../../actions/item_actions';
import {RECEIVE_USER} from '../../actions/session_actions';
import {merge} from 'lodash';

export default (state={}, action)=>{
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_ITEMS:
      return items;//TO BE DECIDED
    case RECEIVE_ITEM:
      return merge(newState, actions.items, {[actions.item.id]:action.item});
    case RECEIVE_USER:
      return newState;//merge(newState, {[action.user.id]:action.user});
    default:
      return state;
  }
};
