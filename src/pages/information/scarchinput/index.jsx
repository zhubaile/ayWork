/*
 * @Date: 2020-05-12 11:35:23
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-13 14:32:51
 */
/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { actions, reducers, connect } from '@combin';
import '../index.css';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    // 回车事件
    enterBtn = (e) => {
        if (e.keyCode === 13) {
            this.searchBtn()
        }
    }
    // 搜索按钮
    searchBtn = () => {
        const valueName = this.inputValue.value;
        this.props.searchInputValue(valueName); //改变输入框的值
        let data = this.props.rlistAllData, // 数据列表的总数据
        newData = [];
        if(valueName){
            data.map((item, index) => {
                debugger
                if(item.name!==undefined||item.age!==undefined||item.title!==undefined){
                    if (item.name.indexOf(valueName) >= 0 || item.age.indexOf(valueName) >= 0 || item.title.indexOf(valueName) >= 0) {
                        newData.push(item)
                    }
                }
            })
            this.props.listSearchAllData(newData); //改变搜索后的全部数据
        }
        // this.props.searchInputValue(newData);

    }

    render() {
        return (
            <div className='search'>
                {/* 搜索框 */}
                <span className="iconfont icon-sousuo" onClick={this.searchBtn} />
                <input type="text" autoComplete="off" name='search' placeholder='请输入您想搜索产品' ref={node => this.inputValue = node} onKeyDown={this.enterBtn} />
            </div>
        );
    }
}

// export default Footer;
export default connect(
    (state) => {
        return { rlistAllData: state.rlistAllData };
    },
    { ...actions.searchAction },
    null
)(Search);