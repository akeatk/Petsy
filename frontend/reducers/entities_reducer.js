import usersReducer from './entities/users_reducer';
import itemsReducer from './entities/items_reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  users:usersReducer,
  items:itemsReducer
});
