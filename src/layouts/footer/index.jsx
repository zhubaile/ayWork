/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { actions, reducers, connect } from '../../store/combin';

class Footer extends Component {
  static displayName = 'UserLogin';

  constructor(props) {
    super(props);
    this.state = {
      Test: this.props.Test,
    };
  }

  render() {
    return (
      <div className='footer'>
        大家好，我是尾部
        <span>这是</span>
      </div>
    );
  }
}

// export default Footer;
export default connect(
  (state) => {
    return { Test: state.Test };
  },
  { ...actions.Test },
  null
)(Footer);