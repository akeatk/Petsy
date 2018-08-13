import {CLICK_DROPDOWN,HIDE_DROPDOWN} from '../../actions/ui_actions';

export default (state=false, action)=>{
  Object.freeze(state);
  switch(action.type){
    case CLICK_DROPDOWN:
      return !state;
    case HIDE_DROPDOWN:
      return false;
    default:
      return false;
  }
};
