import {RECEIVE_ITEM} from '../../actions/item_actions';
import {RECEIVE_REVIEW,DELETE_REVIEW} from '../../actions/review_actions';
import {merge} from 'lodash';

export default (state={}, action)=>{
  Object.freeze(state);

  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_ITEM:
      return merge(
        {current:(action.payload.review ? action.payload.review.id : null)},
        {review_ids: Object.keys(action.payload.reviews || {})},
        action.payload.reviews || {},
        (action.payload.review ? {[action.payload.review.id]:action.payload.review} : {}),
        {purchase:action.payload.purchase}
      );
    case RECEIVE_REVIEW:
      return merge(newState, {current:action.payload.review})
    case DELETE_REVIEW:
      delete(newState[current]);
      return newState;
    default:
      return state;
  }
};
