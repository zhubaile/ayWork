import React, { Component } from "react";

export default class Remove extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: this.props.params,
        };
    }
    // 改变当前input的值
    editInputValue(e) {
        let names = e.target.name, newValue = e.target.value; // 通过names来判断是那个属性发生了改变
        let params = Object.assign({}, this.state.params);
        params[names] = newValue
        this.setState({
            params,
        },()=>{
            this.props.removeBtnParams(params);
        })
    }
    render() {
        const { params } = this.state;
        if (!params) return null;
        return (
            <ul>
                <li>
                    <label >姓名：</label>
                    <input type="text" value={params.name} name='name' onChange={this.editInputValue.bind(this)} />
                </li>
                <li>
                    <label >年龄：</label>
                    <input type="text" value={params.age} name='age' onChange={this.editInputValue.bind(this)} />
                </li>
                <li>
                    <label >爱好：</label>
                    <input type="text" value={params.title} name='title' onChange={this.editInputValue.bind(this)} />
                </li>
            </ul>
        );
    }
}
