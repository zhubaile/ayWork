/*
 * @Date: 2020-05-12 09:40:40
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-13 12:22:56
 */
// ======================================================
// actions 触发reducer 改变 state
// ======================================================
import { getData } from '@indexApi'

const pageSize = 10; // 每一页有10条数据

/**
 * @description: 获取information列表的初始全部数据
 * @author: zbl
 * @param {*} data 
 */
function setListData() {
    return dispatch => {
        getData().then((res) => {
            let data = res.data;
            // currentAll = Math.ceil(res.data.length / pageSize);
            dispatch(listAllData(data));

            dispatch(listPartData(data));
        })
    }

}
// information列表的初始全部数据
function listAllData(data) {
    return {
        type: 'LIST_ALL_DATA',
        data,
    };
}
// information列表搜索的全部数据
function listSearchAllData(data) {
    return {
        type: 'LIST_SEARCH_ALL_DATA',
        data,
    };
}
// information列表的界面展示数据
function listPartData(data) {
    return {
        type: 'LIST_PART_DATA',
        data,
    };
}
// 搜索输入框的值
function searchInputValue(data) {
    return {
        type: 'SEARCH_INPUT_VALUE',
        data,
    };
}

// 当前数据的页码
function currentNum(data) {
    return {
        type: 'RCURRENT_NUM',
        data,
    }
}
// 编辑修改内容
// function confirmData(data){
//     const data = this.state.data,
//         SearchData = this.state.SearchData;
//     let nowData = [];
//     data.map((item, index) => {
//         if (item._id == Cdata._id) {
//             nowData.push(Cdata)
//         } else {
//             nowData.push(data[index])
//         }
//     })

//     this.setState({
//         data: nowData,
//         SearchData: nowData,
//     })
// }
/**
 * 切换显示的数据，例如将前0-10的数据变为10-20条数据
 * zbl
 * @param {*} data 
 */
//   function switchingData (data){
//     let pageList = []; // 最新10条的数据
//     let noneData = [{ name: '', age: '', title: '', _id: '' }];
//     if (data.length > 10) {
//         for (let i = (current - 1) * 10; i < current * 10; i++) {
//             // let a = (data[i]!==undefined||data[i]!==null)?data[i]:'';
//             // pageList.push(data[i])
//             if (data[i]) {
//                 pageList.push(data[i])
//             } else {
//                 pageList.push(...noneData)
//             }
//         }
//     } else {
//         pageList = [...data];
//     }
//     console.log(pageList)
//   }




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