/*
 * @Date: 2020-05-12 09:40:40
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-15 19:08:18
 */
// ======================================================
// actions 触发reducer 改变 state
// ======================================================
import { reducers } from '../combin';
// import { actions as comActions, reducers, IStates } from './combin';
import { getData } from '@indexApi';

/**
 * @description: ajax获取information列表的初始全部数据
 * @author: zbl
 * @param {*} data 
 */
function setListData() {
    return (dispatch,getState) => {
        getData().then((res) => {
            let data = res.data;
            dispatch({
                type: 'LIST_ALL_DATA',
                data,
            });
            getListData(dispatch,getState);
        })
    }

}

/**
 * @description: 当用户更改页码，或者搜索数据的时候，只要是让页面显示数据发生变化的时候，都会进行此操作
 * @author: zbl
 * @param {data} Array 
 */
function getListData(dispatch,getState){
    // slistAllData: [],// information列表总数据
    // slistSearchAllData: [], // information列表搜索的全部数据
    // slistPartData: [],// 列表在当前界面展示的数据

    // ssearchInputValue: "",// 搜索输入框的值
    // scurrentNum: 1, // 当前数据的页码
    // spageSize: 10, //每一页多少条数据
        let { slistAllData, slistSearchAllData, ssearchInputValue, scurrentNum, spageSize } = getState().searchReducer;
        let slistPartData = [];
        if(!ssearchInputValue){
            if (!(slistAllData && slistAllData.length)) return false;
            slistPartData = slistAllData.slice((scurrentNum-1)*spageSize,scurrentNum*spageSize);
            
        }else{
            if (!(slistSearchAllData && slistSearchAllData.length)) return false;
            slistPartData = slistSearchAllData.slice((scurrentNum-1)*spageSize,scurrentNum*spageSize);
        }
        dispatch(listPartData(slistPartData))
}

/**
 * @description
 * @author (Set the text for this tag by adding docthis.authorName to your settings file.)
 * @param {*} data
 * @returns 
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
    return (dispatch, getState) => {
        dispatch({
            type: 'SEARCH_INPUT_VALUE',
            data,
        })

    }
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
        getListData,
    },
};