/*
 * @Date: 2020-05-12 09:40:40
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-18 17:31:43
 */
// ======================================================
// actions 触发reducer 改变 state
// ======================================================
import { getData } from '@indexApi';

/**
 * @description: ajax获取information列表的初始全部数据,更改列表总页数和当前展示数据
 * @author: zbl
 */
function setListData() {
    return dispatch => {
        getData().then((res) => {
            let data = res.data;
            dispatch(getListData(data));
        })
    }

}

/**
 * @description: 此方法用于更改组件中的当前数据列表,总数据和总页码;
 * @author: zbl
 * @param {data} Array 
 */
function getListData(data) {
    return (dispatch, getState) => {
        dispatch({
            type: 'LIST_ALLPARTTOTAL_DATA',
            data: fenc(data, getState)
        })
    }
}
/**
 * @description: 根据全部数据分割出当前数据和总页码并返回
 * @author: zbl
 * @param {Array} data
 * @returns Object
 */
function fenc(data, getState) {
    let { slistAllData, slistSearchAllData, ssearchInputValue, scurrentNum, spageSize } = getState().searchReducer;
    let totalPageNum = 1; // 当前界面展示的数据
    let slistAllDatas = data || slistAllData; // 总数据
    if (!ssearchInputValue) {
        if (!(slistAllDatas && slistAllDatas.length)) return false;
        totalPageNum = Math.ceil(slistAllDatas.length / spageSize) || 1; // 总页数
    } else {
        if (!(slistSearchAllData && slistSearchAllData.length)) return false;
        totalPageNum = Math.ceil(slistSearchAllData.length / spageSize) || 1; // 总页数
    }
    let judgeData = (!ssearchInputValue) ? slistAllDatas : slistSearchAllData;
    return ({
        slistPartData: setSlistPartData(judgeData, scurrentNum, spageSize),
        slistAllData: slistAllDatas,
        stotalPageNum: totalPageNum,
    })
}


/**
 * @description: 用户修改当前页码=>修改当前页码和当前展示的数据
 * @author: zbl
 * @param {Number} number 
 */
function setCurrentNum(number) {
    return (dispatch, getState) => {
        dispatch({
            type: "PART_CURRENT_BTN",
            data: setPartCurrentBtn(number, getState),
        });
    }
}
// 通过新页码展现新的当前数据
function setPartCurrentBtn(number, getState) {
    let { slistAllData, slistSearchAllData, ssearchInputValue, spageSize } = getState().searchReducer;
    let judgeData = (!ssearchInputValue) ? slistAllData : slistSearchAllData;
    return ({
        slistPartData: setSlistPartData(judgeData, number, spageSize),
        scurrentNum: number,
    })
}


/**
 * @description: 搜索输入框的值
 * @author: zbl
 * @param {String} value
 */
function setSearchInputValue(value) {
    return (dispatch, getState) => {
        dispatch({
            type: "SEARCH_INPUT_VALUE",
            data: setSearchEditValue(value, getState),
        });
    }
}
// 通过输入框的值，改变输入框的值和当前数据、搜索总数据以及总页码,只要搜索，当前页变为1
function setSearchEditValue(value, getState) {
    let { slistAllData, scurrentNum, spageSize } = getState().searchReducer;
    let newData = []; // 搜索后的总数据列表
    if (value) {
        slistAllData && slistAllData.forEach(item => {
            if (item.name !== undefined && item.age !== undefined && item.title !== undefined) {
                if (item.name.indexOf(value) >= 0 || item.age.indexOf(value) >= 0 || item.title.indexOf(value) >= 0) {
                    newData.push(item)
                }
            }
        });
    }
    let totalPageNum = 1; // 当前界面展示的数据和总页码
    if (!value) {
        totalPageNum = Math.ceil(slistAllData.length / spageSize) || 1; // 总页数
    } else {
        totalPageNum = Math.ceil(newData.length / spageSize) || 1; // 总页数
    }
    let judgeData = (!value) ? slistAllData : newData;
    return ({
        ssearchInputValue: value,
        slistSearchAllData: newData,
        slistPartData: setSlistPartData(judgeData, scurrentNum, spageSize),
        stotalPageNum: totalPageNum,
        scurrentNum: Number(1),
    })
}


/**
 * @description: 通过组件传过来的对象，将总数据id相同的改掉
 * @author: zbl
 * @param {Object} obj
 */
function setCompileBtn(obj) {
    return (dispatch, getState) => {
        dispatch({
            type: "COMPILE_POPUP_BTN",
            data: setCompilePopupBtn(obj, getState),
        });
    }
}
// 改变原始数据的值
function setCompilePopupBtn(obj, getState) {
    let { slistAllData, slistSearchAllData, ssearchInputValue, spageSize, scurrentNum } = getState().searchReducer;
    slistAllData && slistAllData.some((item, index) => {
        if (item._id === obj._id) {
            return slistAllData[index] = obj
        }
    })

    if (ssearchInputValue) {
        slistSearchAllData && slistSearchAllData.some((item, index) => {
            if (item._id === obj._id) {
                return slistSearchAllData[index] = obj
            }
        })
    }
    let judgeData = (!ssearchInputValue) ? slistAllData : slistSearchAllData;
    return ({
        slistAllData,
        slistSearchAllData,
        slistPartData: setSlistPartData(judgeData, scurrentNum, spageSize),
    })
}
/**
 * @description 接收当前数据，当前页码和页数返回当前界面展示数据
 * @author： zbl
 * @param {Array} data
 * @param {Number} number
 * @param {Number} spageSize
 * @returns {Array} slistPartData
 */
function setSlistPartData(data, number, spageSize) {
    if (!(data && data.length)) return false;
    let slistPartData = data.slice((number - 1) * spageSize, number * spageSize);
    return slistPartData;
}
export default {
    actions: {
        setListData,
        setCompileBtn,
        setSearchInputValue,
        setCurrentNum,
        getListData,
    },
};