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

// 发送邮件
export async function sendMailbox(params) {
    return ajaxAmd.post({
        url: '/test.json',
        data:params,
    });
}