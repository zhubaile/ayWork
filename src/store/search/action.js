/*
 * @Date: 2020-05-12 09:40:40
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-14 14:31:32
 */
// ======================================================
// actions 触发reducer 改变 state
// ======================================================
import { getData } from '@indexApi';

/**
 * @description: ajax获取information列表的初始全部数据
 * @author: zbl
 * @param {*} data 
 */
function setListData() {
    return dispatch => {
        getData().then((res) => {
            let data = res.data;
            dispatch(listAllData(data));
        })
    }

}
/**
 * @description: information列表的初始全部数据
 * @author: zbl
 * @param {data} Array 
 */
function listAllData(data) {
    return {
        type: 'LIST_ALL_DATA',
        data,
    };
}

/**
 * @description: information列表搜索出来的全部数据
 * @author: zbl
 * @param {data} Array 
 */
function listSearchAllData(data) {
    return {
        type: 'LIST_SEARCH_ALL_DATA',
        data,
    };
}
/**
 * @description: information列表的界面展示数据
 * @author: zbl
 * @param {data} Array 
 */
function listPartData(data) {
    return {
        type: 'LIST_PART_DATA',
        data,
    };
}
/**
 * @description: 搜索输入框的值
 * @author: zbl
 * @param {data} String 
 */
function searchInputValue(data) {
    return {
        type: 'SEARCH_INPUT_VALUE',
        data,
    };
}

/**
 * @description: 当前数据的页码
 * @author: zbl
 * @param {data} Number 
 */
function currentNum(data) {
    return {
        type: 'CURRENT_NUM',
        data,
    }
}

export default {
    actions: {
        setListData,
        listAllData,
        listSearchAllData,
        listPartData,
        searchInputValue,
        currentNum,
    },
};