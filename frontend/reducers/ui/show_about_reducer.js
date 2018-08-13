import {SHOW_ABOUT, HIDE_ABOUT} from '../../actions/ui_actions';

export default (state=true, action)=>{
  Object.freeze(state);
  switch(action.type){
    case SHOW_ABOUT:
      return true;
    case HIDE_ABOUT:
      return false;
    default:
      return state;
  }
};
