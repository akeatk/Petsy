import {RECEIVE_ITEM} from '../../actions/item_actions';
import {merge} from 'lodash';

export default (state={}, action)=>{
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_ITEM:
      return action.payload.photos || {};//get rid of or after you seed data
    default:
      return state;
  }
};
