/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { actions, reducers, connect } from '../../store/combin';
import Pagination from './Pagination';
import EditPopup from './EditPopup';
import './index.css';

// @withRouter
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
const GetData = (length = 228) => {
    return Array.from({ length }).map(() => {
        return {
            _id: random(10000, 20000, 30000, 50025, 68522),
            name: ['张三', '李四', '王五', '马六', '牛七', '朱八'][random(0, 5)],
            age: ['20', '21', '22', '36', '45', '48'][random(0, 5)],
            title: ['听音乐🎵', '打游戏📮', '吃橘子🍊', '吃香蕉🍌', '跑步🏃‍♀️', '睡觉🛌'][random(0, 5)],
        };
    });
};
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
    componentWillReceiveProps(nextProps) {
        const Search = nextProps.Search,
            SearchData = this.state.SearchData,
            pageSize = this.state.pageSize;
        let currentAll = Math.ceil(SearchData.length / pageSize);
        // 如果搜索框有值，执行搜索
        if (Search) {
            this.SearchResult(Search)
        }
        // 搜索框没有值，把之前的老数据替换到现在的数据
        if (!Search) {
            this.setState({
                data: SearchData,
                currentAll,
                current: 1,
            })
        }
    }
    // 搜索
    SearchResult = (Search) => {
        const SearchData = this.state.SearchData;
        let that = this;
        // 每次查询之前，确保查询的是总数据
        this.setState({
            data: SearchData,
        }, () => {
            let data = this.state.data,
                newData = [];
            data.map((item, index) => {
                if (item.name.indexOf(Search) >= 0 || item.age.indexOf(Search) >= 0 || item.title.indexOf(Search) >= 0) {
                    newData.push(item)
                }
            })
            const pageSize = that.state.pageSize
            let currentAll = Math.ceil(newData.length / pageSize);
            that.setState({
                data: newData,
                currentAll,
                current: 1,
            })
        })
    }
    // 获取初始数据
    componentDidMount() {
        this.FetchData();
        // let aa = document.querySelectorAll('.tds,table,td');
        // debugger
        // [].forEach.call(document.querySelectorAll('.tds'),function(a){
        //     a.style.outline = "1px solid #"+(~~(Math.random()*(1<<24))).toString(16)
        // })
    }
    MockApi = (len) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(GetData(len));
            }, 600);
        });
    };
    FetchData = (len) => {
        let that = this;
        this.MockApi(len).then((data) => {
            const pageSize = this.state.pageSize
            let currentAll = Math.ceil(data.length / pageSize);
            console.log('总页码:' + currentAll)
            that.setState({
                data,
                currentAll,
                SearchData: data,
            })
        })
    }
    // 编辑弹框
    EditPopup(content) {
        this.editPopup.EditPopupOpen(content);
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
    render() {
        const { data, current, pageSize, currentAll } = this.state;
        let pageList = []; // 最新10条的数据
        let noneData = [{ name: '', age: '', title: '', _id: '' }];
        if (data.length > 10) {
            for (let i = (current - 1) * 10; i < current * 10; i++) {
                // let a = (data[i]!==undefined||data[i]!==null)?data[i]:'';
                // pageList.push(data[i])
                if (data[i]) {
                    pageList.push(data[i])
                } else {
                    pageList.push(...noneData)
                }
            }
        } else {
            pageList = [...data];
        }
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
                                    <td align='center' className={item._id ? 'td_hidden' : 'td_hidden none'} id={item._id} onClick={this.EditPopup.bind(this, item)}>编辑</td>
                                    {/* <td align='center'>{item.name?item.name:''}</td>
                                <td align='center'>{item.age?item.age:''}</td>
                                <td align='center'>{item.title?item.title:''}</td>
                                <td align='center' id={item._id} onClick={this.EditPopup.bind(this)}>编辑</td> */}
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
        const HtmlList = (data.length == 0 || data == undefined) ? <span>暂无数据</span> : equipmentlist;
        return (
            <div className='tableData'>
                <EditPopup ref={node => this.editPopup = node} ConfirmData={this.ConfirmData} />
                {HtmlList}
                <div className='tableData_Pagination'>
                    <Pagination hidden={(data.length < 10 || data == undefined) ? true : false} current={current} currentAll={currentAll} pageSize={pageSize} EditCurrent={this.EditCurrent.bind(this)} />
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return { Search: state.Search };
    },
    { ...actions.Search },
    null
)(ListData);