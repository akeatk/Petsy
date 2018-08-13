import {RECEIVE_SESSION_ERRORS,RECEIVE_CURRENT_USER} from '../../actions/session_actions';
import {merge} from 'lodash';
import {SHOW_NONE} from '../../actions/ui_actions';

export default (state={}, action)=>{
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER: case SHOW_NONE:
      return {};
    default:
      return state;
  }
};
