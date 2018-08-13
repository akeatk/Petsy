import sessionReducer from './session_reducer';
import uiReducer from './ui_reducer';
import entitiesReducer from './entities_reducer';
import errorsReducer from './errors_reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  ui: uiReducer,
  errors:errorsReducer
});
