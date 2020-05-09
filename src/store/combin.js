/*
 * @Date: 2020-05-06 18:38:44
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-08 17:40:35
 */

import User from './user';
import Test from './test';
import Search from './search';
import { connect as reduxConnect } from 'react-redux';

export const connect = reduxConnect;
export const reducers = {
  User: User.reducer,
  Test: Test.reducer,
  Search: Search.reducer,
};
export const actions = {
  User: { ...User.actions },
  Test: { ...Test.actions },
  Search: {...Search.actions},
};

