/*
 * @Date: 2020-05-06 17:46:03
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-15 11:47:37
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
import {
    Provider,
} from 'react-redux';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import UserLayout from "./layouts"
import router from './router';
import Store from './store/index';
const store = Store({});
const CONTAINER = document.getElementById('root');

if (!CONTAINER) {
    throw new Error('当前页面不存在 <div id="root"></div> 节点.');
}

ReactDOM.render(
        <Provider store={store}>
            <Router>
                <UserLayout>
                    {
                        router
                    }
                </UserLayout>
            </Router>
        </Provider>,
    CONTAINER
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
