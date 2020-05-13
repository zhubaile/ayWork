/*
 * @Date: 2020-05-06 18:38:34
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-13 10:03:26
 */
/**
 * Created by Zhanglizhao
*/
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { actions as comActions, reducers, IStates } from './combin';

const comReducers = combineReducers(reducers);

export default (initialState = {}) => {
  // ======================================================
  // 存储初始化 默认为一个对象
  // ======================================================
  let store;
  if (!window.__REDUX_DEVTOOLS_EXTENSION__) {
    store = createStore(
      comReducers,
      initialState,
      applyMiddleware(thunk)
    );
  } else {
    store = createStore(
      comReducers,
      initialState,
      // 插件调试，未安装会报错
      compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
    );
  }
  return store;
};

export const actions = comActions;
