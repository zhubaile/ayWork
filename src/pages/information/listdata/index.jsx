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
            SearchData: [], // 搜索之前的旧数据
            data: [], // 总数据
            current: 1, // 当前页码
            pageSize: 10, //默认一页10条数据
            currentAll: 1, //总页码
        };
    }
    // componentWillReceiveProps(nextProps) {
    //     const Search = nextProps.Search,
    //         SearchData = this.state.SearchData,
    //         pageSize = this.state.pageSize;
    //     let currentAll = Math.ceil(SearchData.length / pageSize);
    //     // 如果搜索框有值，执行搜索
    //     if (Search) {
    //         this.SearchResult(Search)
    //     }
    //     // 搜索框没有值，把之前的老数据替换到现在的数据
    //     if (!Search) {
    //         this.setState({
    //             data: SearchData,
    //             currentAll,
    //             current: 1,
    //         })
    //     }
    // }
    // 搜索
    // SearchResult = (Search) => {
    //     const SearchData = this.state.SearchData;
    //     let that = this;
    //     // 每次查询之前，确保查询的是总数据
    //     this.setState({
    //         data: SearchData,
    //     }, () => {
    //         let data = this.state.data,
    //             newData = [];
    //         data.map((item, index) => {
    //             if (item.name.indexOf(Search) >= 0 || item.age.indexOf(Search) >= 0 || item.title.indexOf(Search) >= 0) {
    //                 newData.push(item)
    //             }
    //         })
    //         const pageSize = that.state.pageSize
    //         let currentAll = Math.ceil(newData.length / pageSize);
    //         that.setState({
    //             data: newData,
    //             currentAll,
    //             current: 1,
    //         })
    //     })
    // }
    // 获取初始数据
    componentDidMount() {
        // this.Btn();
    }
    // 把table的td标签的下边框换成自动颜色
    Btn=()=>{
        setTimeout(()=>{
            var table1 = document.querySelector('.tableList');
            var cells2 = table1.querySelectorAll("td");
            [].forEach.call(cells2, function (a) {
                a.style.borderBottom = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16)
            })
        },1000)
    }
    // 编辑弹框
    editOnePopup(content) {
        this.props.editTwoPopup(content);
        // this.editPopup.EditPopupOpen(content);
    }
    //编辑=>确认修改数据
    ConfirmData = (Cdata) => {
        const data = this.state.data,
            SearchData = this.state.SearchData;
        let nowData = [];
        data.map((item, index) => {
            if (item._id == Cdata._id) {
                nowData.push(Cdata)
            } else {
                nowData.push(data[index])
            }
        })

        this.setState({
            data: nowData,
            SearchData: nowData,
        })
    }

    // 修改页码
    EditCurrent(current) {
        console.log(current);
        this.setState({
            current,
        })
    }
    /**
     *把从redux取出来的数据进行渲染
     *zbl
     * @memberof 
     */
    htmlList = ()=>{
        const { rlistAllData,rlistSearchAllData,rsearchInputValue,rcurrentNum} = this.props; 
        let pageList = []; // 最新10条的数据
        // let noneData = [{ name: '', age: '', title: '', _id: '' }];
        let realData = (!rsearchInputValue)?rlistAllData:rlistSearchAllData;
        pageList = realData.slice((rcurrentNum-1)*10,rcurrentNum*10);
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
        const HtmlList = (pageList == undefined||pageList.length == 0) ? <span>暂无数据</span> : equipmentlist;
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
            rlistSearchAllData:state.rlistSearchAllData,
            rsearchInputValue:state.rsearchInputValue,
            rcurrentNum:state.rcurrentNum,
            // rlistAllData,rlistSearchAllData, rlistPartData,rsearchInputValue,rcurrentNum
        };
    },
    { ...actions.searchAction },
    null
)(ListData);