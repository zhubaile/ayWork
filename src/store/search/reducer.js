/*
 * @Date: 2020-05-12 09:40:49
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-14 10:08:34
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

// let LIST_ALL_DATA = [];
// function rlistAllData(state = LIST_ALL_DATA, action) {
//     switch (action.type) {
//         case "LIST_ALL_DATA":
//             return action.data

//         default:
//             return state;
//     }
// }
// information列表搜索的全部数据
// let LIST_SEARCH_ALL_DATA = [];
// function rlistSearchAllData(state = LIST_SEARCH_ALL_DATA, action) {
//     if (action.type === 'LIST_SEARCH_ALL_DATA') {
//         return action.data;
//     }
//     return state;
// }
// // 列表在当前界面展示的数据
// let LIST_PART_DATA = [];
// function rlistPartData(state = LIST_PART_DATA, action) {
//     if (action.type === 'LIST_PART_DATA') {
//         return action.data;
//     }
//     return state;
// }

// // 搜索输入框的值
// let SEARCH_INPUT_VALUE = "";
// function rsearchInputValue(state = SEARCH_INPUT_VALUE, action) {
//     if (action.type === 'SEARCH_INPUT_VALUE') {
//         return action.data;
//     }
//     return state;
// }
// // 当前数据的页码
// let RCURRENT_NUM = 1;
// function rcurrentNum(state = RCURRENT_NUM, action) {
//     if (action.type === 'RCURRENT_NUM') {
//         return action.data;
//     }
//     return state;
// }


export default {
    reducer
};