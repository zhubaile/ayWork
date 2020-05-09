import React, { Component } from 'react';
import '../index.css';

class EditPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            content: {
                name: '',
                age: '',
                title: '',
                _id: '',
            },
        };
    }
    // 打开弹窗
    EditPopupOpen = (content, confirm) => {
        this.setState({
            open: true,
            content,
        });
    }
    // 关闭弹框
    EditPopupClose = (content, confirm) => {
        this.setState({
            open: false,
            content: {
                name: '',
                age: '',
                title: '',
                _id: '',
            },
        });
        // this.confirmCallBack = confirm;
    }
    //修改==>有后端传输的数据，可以在此通过ajax直接修改数据
    addgrouping() {
        const content = this.state.content;
        this.props.ConfirmData(content);
        this.EditPopupClose();
    }
    // onChange
    EditContent(e) {
        let names = e.target.id, newValue = e.target.value;
        let contents = Object.assign({}, this.state.content);
        contents[names] = newValue
        this.setState({
            content: contents,
        })
    }
    render() {
        if (!this.state.open) return null;
        const { content } = this.state;
        return (
            <div>
                <div className='editPopupbox_box'></div>
                <div className='editPopupbox'>
                    <h2>编辑信息</h2>
                    <ul>
                        <li>
                            <label htmlFor="name">姓名：</label>
                            <input type="text" id='name' value={content.name} onChange={this.EditContent.bind(this)} />
                        </li>
                        <li>
                            <label htmlFor="age">年龄：</label>
                            <input type="text" id='age' value={content.age} onChange={this.EditContent.bind(this)} />
                        </li>
                        <li>
                            <label htmlFor="title">爱好：</label>
                            <input type="text" id='title' value={content.title} onChange={this.EditContent.bind(this)} />
                        </li>
                    </ul>
                    <div className='addgrouping-btn'>
                        <button onClick={this.EditPopupClose}>取消</button>
                        <button onClick={this.addgrouping.bind(this)}>修改</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditPopup;
