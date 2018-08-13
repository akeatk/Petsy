import {SHOW_LOGIN, SHOW_SIGNUP, SHOW_NONE} from '../../actions/ui_actions';
import {RECEIVE_CURRENT_USER,LOGOUT_CURRENT_USER} from '../../actions/session_actions';

export default (state='none', action)=>{
  Object.freeze(state);
  switch(action.type){
    case SHOW_LOGIN:
      return 'login';
    case SHOW_SIGNUP:
      return 'signup';
    case RECEIVE_CURRENT_USER: case SHOW_NONE: case LOGOUT_CURRENT_USER:
      return 'none';
    default:
      return state;
  }
};
