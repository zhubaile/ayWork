/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { actions, reducers, connect } from '@combin';
import Pagination from './pagination';
import EditPopup from './editpopup';
import ListData from './listdata';
import SearchInput from './scarchinput';
import './index.css';

const pageSize = 10;
class Information extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
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
    render() {
        const {searchReducer: {slistAllData,ssearchInputValue,slistSearchAllData} } = this.props;
        let rlistNowAllData = (!ssearchInputValue) ? slistAllData : slistSearchAllData, // 根据输入框的状态判断是所有数据还是搜索的数据
            currentAll = Math.ceil(rlistNowAllData.length / pageSize); // 根据当前总数据获取总页数
        return (
            <div className='tableData'>
                <SearchInput />
                <EditPopup ref={node => this.editPopup = node} />
                <ListData editTwoPopup={this.editTwoPopup} />
                <div className='tableData_Pagination'>
                    <Pagination hidden={(rlistNowAllData == undefined || rlistNowAllData.length <= 10) ? true : false} currentAll={currentAll} pageSize={pageSize} rlistNowAllData={rlistNowAllData} />
                </div>
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