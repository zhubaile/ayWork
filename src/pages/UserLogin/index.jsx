/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { actions, reducers, connect } from '../../store/combin';
// import { loginUser } from '@loginApi';

// @withRouter

class UserLogin extends Component {
  static displayName = 'UserLogin';

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        password: '',
        checkbox: false,
      },
      type: 'password',
      Test:this.props.Test,
    };
  }

  render() {
    return (
        <div>
            大家好，我是登录页
            <Link to="/user/register">
                  跳转注册
                </Link>
    <span>这是redux的值{this.state.Test}</span>
        </div>
    );
  }
}

export default connect(
  (state) => {
    return { Test: state.Test };
  },
  { ...actions.Test },
  null
)(UserLogin);