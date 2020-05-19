/*
 * @Date: 2020-05-19 09:58:47
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-19 10:00:20
 */ 
function setOneAllValue(obj) {
    return (dispatch, getState) => {
        dispatch({
            type: "ONE_ALL_VALUE",
            data: obj,
        });
    }
}
export default{
    actions: {
        setOneAllValue
    },
}