/*
 * @Date: 2020-05-12 09:40:49
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-14 14:11:18
 */

// information列表总数据

let defaultState = {
    slistAllData: [],// information列表总数据
    slistSearchAllData: [], // information列表搜索的全部数据
    slistPartData: [],// 列表在当前界面展示的数据
    ssearchInputValue: "",// 搜索输入框的值
    scurrentNum: 1, // 当前数据的页码
};

function reducer(state = defaultState, action){
    switch (action.type) {
        case "LIST_ALL_DATA": {
            return {
                ...state,
                slistAllData: action.data,
            }
        }
        case "LIST_SEARCH_ALL_DATA": {
            return {
                ...state,
                slistSearchAllData: action.data,
            }
        }
        case "LIST_PART_DATA": {
            return {
                ...state,
                slistPartData: action.data,
            }
        }
        case "SEARCH_INPUT_VALUE": {
            return {
                ...state,
                ssearchInputValue: action.data,
            }
        }
        case "CURRENT_NUM": {
            return {
                ...state,
                scurrentNum: action.data,
            }
        }


        default:
            return state;
    }
}

export default {
    reducer
};