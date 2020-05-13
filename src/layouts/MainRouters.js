/*
 * @Date: 2020-05-07 10:12:55
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-11 17:23:58
 */
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../components/notfound';
import routerData from '@router';

class MainRoutes extends Component {
  /**
   * 渲染路由组件
   */
  renderNormalRoute = (item, index) => {
    return item.component ? (
      <Route
        key={index}
        path={item.path}
        component={item.component}
        exact={item.exact}
      />
    ) : null;
  };

  render() {
    return (
      <Switch>
        {/* 渲染路由表 */}
        {routerData.map(this.renderNormalRoute)}

        {/* 根路由默认重定向到 /manage/company */}
        <Redirect exact from="/" to="/user/informationName" />

        {/* 未匹配到的路由重定向到 NotFound */}
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default MainRoutes;
