

import searchReducer from './search/reducer';
import searchAction from './search/action';

import { connect as reduxConnect } from 'react-redux';

export const connect = reduxConnect;
export const reducers = {
  searchReducer:searchReducer.reducer,
};
export const actions = {
  searchAction: {...searchAction.actions},
};

