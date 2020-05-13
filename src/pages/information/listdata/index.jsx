/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { actions, reducers, connect } from '@combin';
// import Pagination from './pagination';
// import EditPopup from './editpopup';
import '../index.css';

// @withRouter
// const random = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1) + min);
// };
// const GetData = (length = 228) => {
//     return Array.from({ length }).map(() => {
//         return {
//             _id: random(10000, 20000, 30000, 50025, 68522),
//             name: ['张三', '李四', '王五', '马六', '牛七', '朱八'][random(4, 5)],
//             age: ['20', '21', '22', '36', '45', '48'][random(0, 5)],
//             title: ['听音乐🎵', '打游戏📮', '吃橘子🍊', '吃香蕉🍌', '跑步🏃‍♀️', '睡觉🛌'][random(0, 5)],
//         };
//     });
// };
class ListData extends Component {
    static displayName = 'ListData';

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.Btn();
    }
    // 把table的td标签的下边框换成自动颜色
    Btn = () => {
        setTimeout(() => {
            var table1 = document.querySelector('.tableList');
            var cells2 = table1.querySelectorAll("td");
            if (cells2) {
                [].forEach.call(cells2, function (a) {
                    a.style.borderBottom = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16)
                })
            }
        }, 1000)
    }
    /**
    * @description:编辑弹框，调用父元素的editTwoPopup方法打开编辑弹框
    * @author: zbl
    * @param {content} Object
    */
    editOnePopup(content) {
        this.props.editTwoPopup(content);
    }
    /**
    * @description:从redux取全部列表数据，将取出来的数据根据当前页拆分为10条数据渲染
    * @author: zbl
    */
    htmlList = () => {
        const { rlistAllData, rlistSearchAllData, rsearchInputValue, rcurrentNum } = this.props;
        let pageList = []; // 最新10条的数据
        // let noneData = [{ name: '', age: '', title: '', _id: '' }];
        let realData = (!rsearchInputValue) ? rlistAllData : rlistSearchAllData;
        pageList = realData.slice((rcurrentNum - 1) * 10, rcurrentNum * 10);
        console.log(pageList)

        const equipmentlist = (
            <table className='tableList'>
                <tbody>
                    <tr>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>爱好</th>
                        <th>操作</th>
                    </tr>
                </tbody>
                <tbody>
                    {
                        pageList.map((item, key) => {
                            return (
                                <tr className="event_list" key={key}>
                                    <td className='tds' align='center' title={item.name}>{item.name}</td>
                                    <td align='center'>{item.age}</td>
                                    <td align='center' title={item.title}>{item.title}</td>
                                    <td align='center' className={item._id ? 'td_hidden' : 'td_hidden none'} id={item._id} onClick={this.editOnePopup.bind(this, item)}>编辑</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
        const HtmlList = (pageList == undefined || pageList.length == 0) ? <span>暂无数据</span> : equipmentlist;
        return HtmlList;
    }
    render() {
        return (
            <div className='tableList'>
                {this.htmlList()}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            rlistAllData: state.rlistAllData,
            rlistSearchAllData: state.rlistSearchAllData,
            rsearchInputValue: state.rsearchInputValue,
            rcurrentNum: state.rcurrentNum,
        };
    },
    { ...actions.searchAction },
    null
)(ListData);