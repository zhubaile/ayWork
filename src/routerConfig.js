/*
 * @Date: 2020-05-06 17:46:37
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-19 15:13:40
 */
// import Home from './pages/home';
import React from 'react';

// import InformationName from './pages/information';
// import ExalpleValue from './pages/exalplevalue';
// import NotFound from './components/notfound';

const InformationName = React.lazy(() => import('./pages/information'));
const ExalpleValue = React.lazy(() => import('./pages/exalplevalue'));
const NotFound = React.lazy(() => import('./components/notfound'));

// ========系统首页============ //
const routerConfig = [
    // 系统首页
    {
        path: '/user/informationName',
        component: InformationName,
    },
    {
        path: '/user/exalplevalue',
        component: ExalpleValue,
    },
    {
        path: '/user/*',
        component: NotFound,
    },
];

export default routerConfig;
