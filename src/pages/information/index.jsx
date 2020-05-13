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
            SearchData: [], // 搜索之前的旧数据
            data: [], // 总数据
            current: 1, // 当前页码
            pageSize: 10, //默认一页10条数据
            currentAll: 1, //总页码
        };
    }
    componentDidMount(){
        this.props.setListData(); // 获取到列表的全部数据
    }
    // 打开编辑弹框
    editTwoPopup=(content)=>{
        this.editPopup.editPopupOpen(content);
    }
    render() {
        // EditPopup => ConfirmData={this.ConfirmData}
        // Pagination => EditCurrent={this.EditCurrent.bind(this)}
        const { rlistAllData,rlistSearchAllData,rsearchInputValue } = this.props;
        let rlistNowAllData = (!rsearchInputValue)?rlistAllData:rlistSearchAllData, // 根据输入框的状态判断是所有数据还是搜索的数据
        currentAll = Math.ceil(rlistNowAllData.length / pageSize); // 根据当前总数据获取总页数
        debugger
        return (
            <div className='tableData'>
                <SearchInput />
                <EditPopup ref={node=>this.editPopup=node} />
                <ListData editTwoPopup={this.editTwoPopup}/>
                <div className='tableData_Pagination'>
                    <Pagination hidden={(rlistNowAllData == undefined||rlistNowAllData.length <= 10) ? true : false} currentAll={currentAll} pageSize={pageSize} rlistNowAllData={rlistNowAllData} />
                </div>
            </div>
        );
    }
}

// export default Information;

export default connect(
    (state) => {
        return{ rlistAllData: state.rlistAllData,
             rlistSearchAllData:state.rlistSearchAllData, 
             rsearchInputValue:state.rsearchInputValue,
            //  rlistNowAllData:state.rlistNowAllData,
            //  rlistPartData, rsearchInputValue, rcurrentNum,
            }
    },
    { ...actions.searchAction },
    null
)(Information);