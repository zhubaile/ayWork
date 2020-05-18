/*
 * @Date: 2020-05-06 18:35:14
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-18 17:28:12
 */
import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainRouters from './mainrouters';
import routerData from '../routerConfig';
import Footer from './footer';
import Header from './header';


export default class UserLayout extends Component {
    render() {
        return (
            <div>
                <Header />
                <main className='main'>
                    <Suspense>
                        <Switch>
                            {routerData.map((item, index) => {
                                return item.component ? (
                                    <Route
                                        key={index}
                                        path={item.path}
                                        component={item.component}
                                        exact={item.exact}
                                        aa = 'zhubaile'
                                    />
                                ) : null;
                            })}
                            <MainRouters />
                        </Switch>
                    </Suspense>
                </main>
                <Footer />
            </div>
        );
    }
}