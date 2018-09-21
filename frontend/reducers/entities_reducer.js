import usersReducer from './entities/users_reducer';
import itemsReducer from './entities/items_reducer';
import photosReducer from './entities/photos_reducer';
import cartItemsReducer from './entities/cart_items_reducer';
import ReviewsReducer from './entities/reviews_reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  users:usersReducer,
  items:itemsReducer,
  photos:photosReducer,
  cart_items:cartItemsReducer,
  reviews:ReviewsReducer
});
