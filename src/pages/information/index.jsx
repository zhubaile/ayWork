/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { actions, connect } from '@combin';

import List from'../../components/list';
import Dialog from'../../components/dialog';
import Remove from './editpopup/remove';

import Pagination from './pagination';
import EditPopup from './editpopup/index';
import ListData from './listdata';
import SearchInput from './scarchinput';
import './index.css';

const pageSize = 10;
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
                title:"姓名",
                dataIndex:"name",
            },
            {
                title:"年龄",
                dataIndex:"age",
            },
            {
                title:"爱好",
                dataIndex:"title",
            },
            {
                title:"操作",
                render:(text,value,index)=><a href="javascrips:;" className='operation' onClick={()=>{
                    this.setState({
                        isOpen: true,
                        content:<Remove params={value} removeBtnParams={this.removeBtnParams} />,
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
    removeBtnParams=(params)=>{
        this.setState({
            contentPaeams:params,
        })
    }
    
    // 通用弹框组件Dialog的确定按钮
    dialogConfirmBtn(){
        const { contentPaeams } = this.state;
        const { searchReducer: {slistAllData,slistSearchAllData}  } = this.props;
        let nowData = [],nowSearchData=[]; // 修改过的新数据
        slistAllData && slistAllData.map((item, index) => {
            nowData.push((item._id == contentPaeams._id)?contentPaeams:slistAllData[index]);
        })
        slistSearchAllData && slistSearchAllData.map((item, index) => {
            nowSearchData.push((item._id == contentPaeams._id)?contentPaeams:slistSearchAllData[index]);
        })
        this.props.listAllData(nowData); // 调用action的listAllData方法，把编辑好的数据替换到全部数据
        this.props.listSearchAllData(nowSearchData); // 调用action的listSearchAllData方法，把编辑好的数据替换到全部的搜索数据

        this.setState({isOpen:false}); // 关闭弹框
    }
    render() {
        const { isOpen,content } = this.state;
        const {searchReducer: {slistAllData,ssearchInputValue,slistSearchAllData,scurrentNum} } = this.props;
        let rlistNowAllData = (!ssearchInputValue) ? slistAllData : slistSearchAllData, // 根据输入框的状态判断是所有数据还是搜索的数据
            currentAll = Math.ceil(rlistNowAllData.length / pageSize); // 根据当前总数据获取总页数
            let pageList = (rlistNowAllData && rlistNowAllData.length)?rlistNowAllData.slice((scurrentNum - 1) * 10, scurrentNum * 10):null; // 通用组件使用的当前界面展示数据
        return (
            <div className='tableData'>
                <SearchInput />
                <EditPopup ref={node => this.editPopup = node} />
                <ListData editTwoPopup={this.editTwoPopup} />
                <div className='tableData_Pagination'>
                    <Pagination hidden={(rlistNowAllData == undefined || rlistNowAllData.length <= 10) ? true : false} currentAll={currentAll} pageSize={pageSize} rlistNowAllData={rlistNowAllData} />
                </div>

                <List columns={this.columns} data={pageList}/>
                <Dialog isOpen={isOpen} content={content} title="弹出框" 
                btns={[
                    {title:"取消",onClick:()=>{this.setState({isOpen:false})}},
                    {title:"确定",onClick:()=>{this.dialogConfirmBtn()}}
            ]} 
                />
            </div>
        );
    }
}

// export default Information;

export default connect(
    (state) => {
        return {
            searchReducer:state.searchReducer,
        }
    },
    { ...actions.searchAction },
    null
)(Information);