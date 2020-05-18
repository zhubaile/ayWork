/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import '../css/index.css';


class Header extends Component {
    static displayName = 'Header';

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className='header'>
                <span>大家好，我是头部</span>
                <div className='header_right'>
                    Hello Word
          </div>

            </div>
        );
    }
}

export default Header;