/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { actions, connect } from '@combin';

import List from '../../components/list';
import Dialog from '../../components/dialog';
import Remove from './editpopup/remove';

import Pagination from './pagination';
import EditPopup from './editpopup/index';
import ListData from './listdata';
import SearchInput from './scarchinput';
import './index.css';

class Information extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false, // 弹框是否打开
            content: null, // 弹框内的值,对应Remove组件
            contentPaeams: {}, // 弹框内的input的值
        };
        this.columns = [
            {
                title: "姓名",
                dataIndex: "name",
            },
            {
                title: "年龄",
                dataIndex: "age",
            },
            {
                title: "爱好",
                dataIndex: "title",
            },
            {
                title: "操作",
                render: (text, value, index) => <a href="javascrips:;" className='operation' onClick={() => {
                    this.setState({
                        isOpen: true,
                        content: <Remove params={value} removeBtnParams={this.removeBtnParams} />,
                    })
                }}>编辑</a>,
            },
        ];
    }
    // 获取到列表的全部数据
    componentDidMount() {
        this.props.setListData();
    }
    /**
     * @description:listdata界面通过此方法打开编辑弹框，并把值传过去
     * @author: zbl
     * @param {content} Object
     */
    editTwoPopup = (content) => {
        this.editPopup.editPopupOpen(content);
    }
    /**
     * @description:Remove组件修改过后的input的值
     * @author: zbl
     * @param {params} Object
     */
    removeBtnParams = (params) => {
        this.setState({
            contentPaeams: params,
        })
    }

    // 通用弹框组件Dialog的确定按钮
    dialogConfirmBtn() {
        const { contentPaeams } = this.state;
        this.props.setCompileBtn(contentPaeams);
        this.setState({ isOpen: false }); // 关闭弹框
    }
    render() {
        const { isOpen, content } = this.state;
        const { searchReducer: { slistPartData, stotalPageNum } } = this.props;
        return (
            <div className='tableData'>
                <SearchInput />
                <EditPopup ref={node => this.editPopup = node} />
                <ListData editTwoPopup={this.editTwoPopup} />
                <div className='tableData_Pagination'>
                    <Pagination hidden={(stotalPageNum === undefined || stotalPageNum <= 1) ? true : false} />
                </div>

                <List columns={this.columns} data={slistPartData} />
                <Dialog isOpen={isOpen} content={content} title="弹出框"
                    btns={[
                        { title: "取消", onClick: () => { this.setState({ isOpen: false }) } },
                        { title: "确定", onClick: () => { this.dialogConfirmBtn() } }
                    ]}
                />
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            searchReducer: state.searchReducer,
        }
    },
    { ...actions.searchAction },
    null
)(Information);