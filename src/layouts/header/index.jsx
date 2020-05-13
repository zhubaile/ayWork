/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { actions, reducers, connect } from '../../store/combin';
import '../css/index.css';


class Header extends Component {
  static displayName = 'Header';

  constructor(props) {
    super(props);
    this.state = {
      // Search: this.props.Search,
    };
  }
  // // 回车事件
  // EnterBtn = (e) => {
  //   if (e.keyCode === 13) {
  //     this.SearchBtn()
  //   }
  // }
  // // 搜索按钮
  // SearchBtn = () => {
  //   const valueName = this.inputValue.value;
  //   this.props.editor(valueName)
  // }
  render() {
    return (
      <div className='header'>
          <span>大家好，我是头部</span>
          {/* 搜索框 */}
          {/* <div className="header_search">
              <span className="iconfont icon-sousuo" onClick={this.SearchBtn} />
              <input type="text" autoComplete="off" name='search' placeholder='请输入您想搜索产品' ref={node => this.inputValue = node} onKeyDown={this.EnterBtn} />
          </div> */}

          <div className='header_right'>
            Hello Word
          </div>

      </div>
    );
  }
}

// export default Footer;
export default connect(
  (state) => {
    return { Search: state.Search };
  },
  { ...actions.Search },
  null
)(Header);