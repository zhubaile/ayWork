/*
 * @Date: 2020-05-19 18:53:57
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-20 12:57:36
 */

let listTwoAllDatas = []; // 存起来的全部数据


/**
 * @description: 接收当前页码、页数和搜索框的值和修改过的内容，用于用户修改数据
 * @author： zbl
 * @param {Number} currentNum
 * @param {Number} pageSize
 * @param {String} searchInputValue
 * @param {Object} obj
 * @returns: setListPartData
 */
function setCompileDataBtn(currentNum, pageSize, searchInputValue, obj) {
    listTwoAllDatas && listTwoAllDatas.some((item, index) => {
        if (item._id === obj._id) {
            return listTwoAllDatas[index] = obj
        }
    })
    return setListPartData(currentNum, pageSize, searchInputValue, listTwoAllDatas)
}

/**
* @description 接收当前页码、页数和搜索框的值=>返回页码、页数、搜索框的值、当前展示数据和总页数
* @author： zbl
* @param {Number} currentNum
* @param {Number} pageSize
 * @param {String} searchInputValue
 * @param {Array} listOneAllData
* @returns Object
*/
function setListPartData(currentNum, pageSize, searchInputValue, listOneAllData) {
    if (listOneAllData) listTwoAllDatas = listOneAllData; // 如果传进来的有全部数据，将本地全部数据替换
    let listAllData = listOneAllData || listTwoAllDatas;

    if (!(listAllData && listAllData.length)) return { currentNum, listPartData: [], pageSize,searchInputValue,totalPageNum: 1 }; // 如果总数据没有值，数据返回默认值
    let listSearchAllData = [], totalPageNum = 1, listPartData = [];
    // 根据搜索框判断当前搜索的数据的值
    if (searchInputValue) {
        listAllData.forEach(item => {
            if (item.name !== undefined && item.age !== undefined && item.title !== undefined) {
                if (item.name.indexOf(searchInputValue) >= 0 || item.age.indexOf(searchInputValue) >= 0 || item.title.indexOf(searchInputValue) >= 0) {
                    listSearchAllData.push(item)
                }
            }
        });
    }
    // 输出总页数和组件当前展示的数据
    let nowData = (listSearchAllData && listSearchAllData.length > 0)?listSearchAllData:listAllData;
    totalPageNum = Math.ceil(nowData.length / pageSize) || 1; // 总页数
    listPartData = nowData.slice((currentNum - 1) * pageSize, currentNum * pageSize); // 切割当前数据
    return {
        currentNum,
        pageSize,
        listPartData,
        totalPageNum,
        searchInputValue,
    }
}
export default {
    setListPartData, setCompileDataBtn
}