/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';

import '../index.css';
class Pagination extends Component {
    static displayName = 'Pagination';

    constructor(props) {
        super(props);
        this.state = {
            // current: this.props.current, // 页码
            // pageSize: 10, //默认一页10条数据
            // currentAll: this.props.currentAll,
            // hidden:true,
        };
    }
    /**
     * @param {*} current 
     * Number
     */
    // 点击固定页码修改
    NumEditCurrentBtn(current) {
        this.props.EditCurrent(current);
    }
    // 输入框触发修改页码的回车事件
    InputEditCurrentBtn=(e)=>{
        if (e.keyCode === 13) {
            this.ReplaceCurrent(e)
          }
    }
    // 页码替换
    ReplaceCurrent=(e)=>{
        const currentAll = this.props.currentAll;
        let current = Number(this.input.value);
        if(current<=currentAll){
            this.props.EditCurrent(current);
        }else(
            alert('没有该页数据')
        )
        this.input.value='';
    }
    // 加减按钮修改页码
    BtnEdit(type) {
        let { current, currentAll } = this.props;
        if (type == 'Add') {
            if (current >= currentAll) {
                alert('当前已经是最后一页了')
                return false
            } else {
                current += 1;
            }
        } else {
            if (current <= 1) {
                alert('当前已经是第一页了')
                return false
            } else {
                current -= 1;
            }
        }
        this.props.EditCurrent(current);
    }
    render() {
        const { current, pageSize, currentAll, hidden } = this.props;

        var currentAllNum = [], // 所有的总页数
        TheCurrentAllNum = []; // 当前界面上显示的数
        for (let i = 1; i <= currentAll; i++) {
            currentAllNum.push(i);
        }

        for(let i = current; i < current + 5; i++){
            if(i<=currentAllNum.length){
                TheCurrentAllNum.push(i)
            }
        }
        const pageSizeTab = (
            <ul className='currents_all'>
                {
                    TheCurrentAllNum.map((item, index) => {
                        return (
                            <li key={index} className={item == current ? 'currents active' : 'currents'} id={item} onClick={this.NumEditCurrentBtn.bind(this, item)}>
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        )
        if (this.props.hidden) return null;
        return (
            <div className='Pagination'>
                <span>第{current}页，共{currentAll}页</span>
                <input className='Pagination_input' type="text" onKeyDown={this.InputEditCurrentBtn} ref={node=>this.input=node} />
                <button onClick={this.BtnEdit.bind(this, 'Min')}>◀</button>
                {pageSizeTab}
                <button onClick={this.BtnEdit.bind(this, 'Add')}>▶</button>
            </div>
        );
    }
}

export default Pagination;