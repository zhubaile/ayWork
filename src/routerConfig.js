/*
 * @Date: 2020-05-06 17:46:37
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-07 18:18:24
 */
// import Home from './pages/home';
import Login from './pages/UserLogin';
import Register from './pages/UserRegister';
import DataList from './pages/ListData';

// ========系统首页============ //
const login = [
  // 系统首页
  {
    path: '/user/login',
    component: Login,
  },
  {
    path: '/user/register',
    component: Register,
  },
  {
    path: '/user/dataList',
    component: DataList,
  },
];

// export default login;
export default [].concat(login, [{
  path: '/user/*',
  component: Login,
}]);
