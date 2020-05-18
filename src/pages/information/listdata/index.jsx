/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { actions, connect } from '@combin';

class ListData extends Component {
    static displayName = 'ListData';

    constructor(props) {
        super(props);
        this.state = {

        };
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
    * @description:从redux取当前列表数据
    * @author: zbl
    */
    htmlList = () => {
        const { searchReducer: { slistPartData } } = this.props;
        const equipmentlist = (
            <table className='tableList'>
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>爱好</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slistPartData && slistPartData.map((item) => {
                            return (
                                <tr className="event_list" key={item._id}>
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
        const HtmlList = (!(slistPartData || slistPartData.length)) ? <span>暂无数据</span> : equipmentlist;
        return HtmlList;
    }
    render() {
        return (
            <div>
                {this.htmlList()}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            searchReducer: state.searchReducer,
        };
    },
    { ...actions.searchAction },
    null
)(ListData);