/*
 * @Date: 2020-05-12 09:40:40
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-20 12:29:48
 */
// ======================================================
// actions 触发reducer 改变 state
// ======================================================
import { getData } from '@indexApi';
import Server from '../../assets/server';

/**
 * @description: ajax获取information列表的初始全部数据,更改列表总页数和当前展示数据
 * @author: zbl
 */
const setListData =()=> {
    return (dispatch, getState) => {
        let { currentNum, pageSize, searchInputValue } = getState().searchReducer;
        getData().then((res) => {
            let listAllData = res.data;
            dispatch({
                type: 'LIST_ALLPARTTOTAL_DATA',
                data: Server.setListPartData(currentNum, pageSize, searchInputValue, listAllData),
            })
        })
      
    }
}
/**
 * @description: 用户修改当前页码
 * @author: zbl
 * @param {Number} number 
 */
function setCurrentNum(number) {
    return (dispatch, getState) => {
        let { pageSize, searchInputValue } = getState().searchReducer;
        dispatch({
            type: "PART_CURRENT_BTN",
            data: Server.setListPartData(number, pageSize, searchInputValue),
        });
    }
}


/**
 * @description: 用户搜索数据
 * @author: zbl
 * @param {String} value
 */
function setSearchInputValue(value) {
    return (dispatch, getState) => {
        let {currentNum, pageSize } = getState().searchReducer;
        dispatch({
            type: "SEARCH_INPUT_VALUE",
            data: Server.setListPartData(currentNum, pageSize, value),
        });
    }
}

/**
 * @description: 用户编辑数据进行修改
 * @author: zbl
 * @param {Object} obj
 */

function setCompileBtn(obj) {
    return (dispatch, getState) => {
        let {currentNum, pageSize, searchInputValue } = getState().searchReducer;
        dispatch({
            type: "COMPILE_POPUP_BTN",
            data: Server.setCompileDataBtn(currentNum, pageSize, searchInputValue, obj),
        });
    }
}

export default {
    actions: {
        setListData,
        setCompileBtn,
        setSearchInputValue,
        setCurrentNum,
    },
};