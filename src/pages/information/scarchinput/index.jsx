/*
 * @Date: 2020-05-12 11:35:23
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-13 15:36:33
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
    // 搜索框的回车事件
    enterBtn = (e) => {
        if (e.keyCode === 13) {
            this.searchBtn()
        }
    }
    /**
     * @description:触发搜索，将输入框的值跟总体数据作对比，将符合条件的值返回一个新的Array列表,接着触发listSearchAllData方法去更新搜索出来的所有数据。
     * @author: zbl
     */
    searchBtn = () => {
        const valueName = this.inputValue.value;
        this.props.searchInputValue(valueName); //改变输入框的值
        let data = this.props.rlistAllData, // 数据列表的总数据
        newData = [];
        if(valueName){
            data.map((item, index) => {
                if(item.name!==undefined||item.age!==undefined||item.title!==undefined){
                    if (item.name.indexOf(valueName) >= 0 || item.age.indexOf(valueName) >= 0 || item.title.indexOf(valueName) >= 0) {
                        newData.push(item)
                    }
                }
            })
            this.props.listSearchAllData(newData); //改变搜索后的全部数据
        }

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

export default connect(
    (state) => {
        return { rlistAllData: state.rlistAllData };
    },
    { ...actions.searchAction },
    null
)(Search);