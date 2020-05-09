/*
 * @Date: 2020-05-07 14:56:26
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-07 16:57:52
 */
import ajaxAmd from '@ajax';
// import ajaxAmd from '../../assets/common/axios';
// 菜单查询接口
export async function getMenu(params) {
    return ajaxAmd.post({
        url: 'menu/user',
        data: params,
    });
}
// import { loginUser } from '@loginApi';
// loginUser({
//     username: values.username,
//     password: values.password,
//   }).then(({state,data})=>{
//   })

// 发送邮件
export async function sendMailbox(params) {
    return ajaxAmd.get({
        url: '/sendRegisterMail',
        params,
    });
}