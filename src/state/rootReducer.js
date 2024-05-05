import { combineReducers } from 'redux';
import userReducer from './userSlice';
import formReducer from './formSlice';

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
});

export default rootReducer;
