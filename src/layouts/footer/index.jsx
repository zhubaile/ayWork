import React, { Component } from 'react';
class Footer extends Component {
    constructor(props) {
        super(props);
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

export default Footer;