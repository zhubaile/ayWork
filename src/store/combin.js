

import searchReducer from './search/reducer';
import searchAction from './search/action';

import { connect as reduxConnect } from 'react-redux';

export const connect = reduxConnect;
export const reducers = {
  // searchReducer: {...searchReducer.reducers},
  // firstOne: searchReducer.redd,
  rlistAllData: searchReducer.rlistAllData,
  rlistPartData: searchReducer.rlistPartData,
  rlistSearchAllData:searchReducer.rlistSearchAllData,
  rsearchInputValue:searchReducer.rsearchInputValue,
  rcurrentNum:searchReducer.rcurrentNum,

};
export const actions = {
  searchAction: {...searchAction.actions},
};

