import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { thunk } from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  middleware: () => {
    return [thunk]
  },
});

export default store;
