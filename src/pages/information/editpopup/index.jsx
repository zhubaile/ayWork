import React, { Component } from 'react';
import { actions, connect } from '@combin';

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
    /**
    * @description:打开弹窗
    * @author: zbl
    * @param {content} Object
    */
    editPopupOpen = (content, confirm) => {
        this.setState({
            open: true,
            content,
        });
    }
    /**
    * @description:关闭弹窗
    * @author: zbl
    */
    editPopupClose = () => {
        this.setState({
            open: false,
            content: {
                name: '',
                age: '',
                title: '',
                _id: '',
            },
        });
    }
    /**
    * @description:修改数据，获取到全部数据和当前修改的数据，通过唯一表示_id进行判断，合并生成新的数据并替换到redux的全部数据里面
    * @author: zbl
    */
    addGrouping() {
        const content = this.state.content;
        const { searchReducer: {slistAllData,slistSearchAllData}  } = this.props;

        let nowData = [],nowSearchData=[]; // 修改过的新数据
        slistAllData && slistAllData.map((item, index) => {
            nowData.push((item._id == content._id)?content:slistAllData[index]);
        });
        slistSearchAllData && slistSearchAllData.map((item, index) => {
            nowSearchData.push((item._id == content._id)?content:slistSearchAllData[index]);
        });
        this.props.listAllData(nowData);// 调用action的listAllData方法，把编辑好的数据替换到全部数据
        this.props.listSearchAllData(nowSearchData);// 调用action的listSearchAllData方法，把编辑好的数据替换到全部的搜索数据
        this.editPopupClose(); // 关闭弹框
    }
    // onChange 更改输入框的值
    editContent(e) {
        let names = e.target.id, newValue = e.target.value; // 通过names来判断是那个属性发生了改变
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
                            <input type="text" autoComplete="off" id='name' value={content.name} onChange={this.editContent.bind(this)} />
                        </li>
                        <li>
                            <label htmlFor="age">年龄：</label>
                            <input type="text" autoComplete="off" id='age' value={content.age} onChange={this.editContent.bind(this)} />
                        </li>
                        <li>
                            <label htmlFor="title">爱好：</label>
                            <input type="text" autoComplete="off" id='title' value={content.title} onChange={this.editContent.bind(this)} />
                        </li>
                    </ul>
                    <div className='addgrouping-btn'>
                        <button onClick={this.editPopupClose}>取消</button>
                        <button onClick={this.addGrouping.bind(this)}>修改</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            searchReducer:state.searchReducer,
        };
    },
    { ...actions.searchAction },
    null,
    { forwardRef: true }
)(EditPopup);