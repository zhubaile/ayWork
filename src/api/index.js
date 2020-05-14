/*
 * @Date: 2020-05-07 14:56:26
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-13 16:40:46
 */
  /**
  * @description: ajax封装调用
  * @author: zbl
  */
import ajaxAmd from '@ajax';
// import ajaxAmd from '../../assets/common/axios';
// 菜单查询接口
export async function getData(params) {
    return ajaxAmd.get({
        url: '/app.json',
        params,
    });
}

// export async function getDatas(params) {
//     return ajaxAmd.post({
//         url: '/app.js',
//         data:params,
//     });
// }