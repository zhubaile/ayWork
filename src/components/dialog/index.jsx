import React, { Component } from "react";

import './index.css';
export default class Dialog extends Component {
    static displayName = "Dialog";
    static defaultProps = {
        content: null,
        isOpen: false,
        title: "??",
        btns: [
            // {title:'',onClick:()=>{}}
        ],
    };
    getBtns(btns) {
        if (!(btns && btns.length)) return null;
        return (
            <div className="addgrouping-btn">
                {btns.map((value, index) => (
                    <button key={`btn${index}`} onClick={value.onClick || (()=>{console.log('12345679')})} >{value.title}</button>
                ))}
            </div>
        )
    }

    render() {
        const { content, isOpen, title, btns } = this.props;
        if (!(isOpen && content)) return null;
        return (
            <div>
                <div className="editPopupbox_box"></div>
                <div className="editPopupbox">
                    <h2>{title}</h2>
                    {content}
                    {this.getBtns(btns)}
                </div>
            </div>
        )
    }
}