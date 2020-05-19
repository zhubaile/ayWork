

import searchReducer from './search/reducer';
import searchAction from './search/action';

import undoredoReducer from './undoredo/reducer';
import undoredoAction from './undoredo/action';

import { connect as reduxConnect } from 'react-redux';

export const connect = reduxConnect;
export const reducers = {
    searchReducer: searchReducer.reducer,
    undoredoReducer: undoredoReducer.undoRedos,
};
export const actions = {
    searchAction: { ...searchAction.actions },
    undoredoAction: {...undoredoAction.actions},
};

