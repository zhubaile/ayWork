/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { actions, reducers, connect } from '../../store/combin';
// import { registerUser } from '@loginApi';

// @withRouter
class UserRegister extends Component {
  static displayName = 'UserRegister';

  static propTypes = {};

  static defaultProps = {};
  constructor(props) {
    super(props);
    console.log('props:---'+this.props)
    console.log(this.props.match); // 获取到详细的路由地址
    const query = this.props.location.search; // '?s=1&f=7'
    let arr,
      initialemail,
      failedCount;
    if (query) {
      arr = query.split('&');
      initialemail = arr[0].substr(7); // 获取邮箱值
      failedCount = arr[1].substr(5); // '7'
    } else {
      initialemail = '';
      failedCount = '';
    }
    console.log(this.props)
    this.state = {
      value: {
        name: '',
        username: '',
        tel: '',
        email: initialemail,
        passwd: '',
        rePasswd: '',
        sign: failedCount,
      },
      Test: this.props.Test,
    };
  }
  changeTest() {
    const nameValue = this.input.value;
    this.setState({
      Test: nameValue,
    },()=>{
      this.props.editor(nameValue)
    })
  };
  render() {
    const { Test } = this.state
    return (
      <div>
        大家好，我是注册界面
        <Link to="/user/login">跳转登录</Link>
         我是redux的值{Test}
        <input type="text" ref={node => this.input = node} />
        <button onClick={this.changeTest.bind(this)}>改变redux</button>
      </div>
    );
  }
}

// export default UserRegister;
export default connect(
  (state) => {
    return { Test: state.Test };
  },
  { ...actions.Test },
)(UserRegister);
