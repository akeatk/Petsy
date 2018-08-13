import usersReducer from './entities/users_reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  users:usersReducer
});
