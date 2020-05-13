/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { actions, reducers, connect } from '@combin';


import '../index.css';

class Pagination extends Component {
    static displayName = 'Pagination';

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    /**
    * @description:点击固定页码修改
    * @author: zbl
    * @param {current} Number
    */
    numEditCurrentBtn(current) {
        this.props.currentNum(current);
    }
    /**
    * @description:输入框触发修改页码的回车事件
    * @author: zbl
    */
    inputEditCurrentBtn = (e) => {
        if (e.keyCode === 13) {
            this.replaceCurrent(e)
        }
    }
    /**
    * @description:手动输入更改页码
    * @author: zbl
    */
    replaceCurrent = (e) => {
        const currentAll = this.props.currentAll; // 全部页码
        let current = Number(this.input.value); // 输入框的页码值
        if (current <= currentAll) {
            this.props.currentNum(current);
        } else (
            alert('没有该页数据')
        )
        this.input.value = '';
    }

    /**
    * @description:加减按钮修改页码
    * @author: zbl
    * @param {type} String=>'Min','Add'
    */
    btnEdit(type) {
        let { rcurrentNum, currentAll } = this.props;
        if (type == 'Add') {
            if (rcurrentNum >= currentAll) {
                alert('当前已经是最后一页了')
                return false
            } else {
                rcurrentNum += 1;
            }
        } else {
            if (rcurrentNum <= 1) {
                alert('当前已经是第一页了')
                return false
            } else {
                rcurrentNum -= 1;
            }
        }
        this.props.currentNum(rcurrentNum);
    }
    /**
    * @description:通过总页数和当前页数，计算出当前界面上展示的页码数并渲染，待优化
    * @author: zbl
    */
    pageSizeTab = () => {
        const { rcurrentNum, currentAll } = this.props;
        var currentAllNum = [], // 所有的总页数,数组形式展现
            TheCurrentAllNum = []; // 当前界面上显示的页数

        // 总页数的数组
        for (let i = 1; i <= currentAll; i++) {
            currentAllNum.push(i);
        }
        // 获取当前五页的值
        for (let i = rcurrentNum; i < rcurrentNum + 5; i++) {
            if (i <= currentAllNum.length) {
                TheCurrentAllNum.push(i)
            }
        }
        const pageSizeTab = (
            <ul className='currents_all'>
                {
                    TheCurrentAllNum.map((item, index) => {
                        return (
                            <li key={index} className={item == rcurrentNum ? 'currents active' : 'currents'} id={item} onClick={this.numEditCurrentBtn.bind(this, item)}>
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        )
        return pageSizeTab;
    }
    render() {
        const { rcurrentNum, currentAll, hidden } = this.props;
        if (hidden) return null;
        return (
            <div className='Pagination'>
                <span>第{rcurrentNum}页，共{currentAll}页</span>
                <input className='Pagination_input' type="text" onKeyDown={this.inputEditCurrentBtn} ref={node => this.input = node} />
                <button onClick={this.btnEdit.bind(this, 'Min')}>◀</button>
                {this.pageSizeTab()}
                <button onClick={this.btnEdit.bind(this, 'Add')}>▶</button>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            rlistAllData: state.rlistAllData,
            rcurrentNum: state.rcurrentNum,
            rlistSearchAllData: state.rlistSearchAllData,
            rsearchInputValue: state.rsearchInputValue,
        }
    },
    { ...actions.searchAction },
    null
)(Pagination);