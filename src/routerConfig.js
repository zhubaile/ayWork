/*
 * @Date: 2020-05-06 17:46:37
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-11 17:52:10
 */
// import Home from './pages/home';
import informationName from './pages/information';

// ========系统首页============ //
const login = [
  // 系统首页
  {
    path: '/user/informationName',
    component: informationName,
  },
];

// export default login;
export default [].concat(login, [{
  path: '/user/*',
  component: informationName,
}]);
