import React, { Component } from 'react';

import './index.css';
export default class List extends Component {
    static displayName = 'List';

    getTbody(columns, data) {
        if (!(data && data.length)) return (
            <tr>
                <td>没有数据</td>
            </tr>
        );
        return data.map((value, index) => (
            <tr key={`tr${index}`}>{columns.map((column, i) => (
                <td align='center' key={`td${index}${i}`}>{column.render ? column.render(value[column.dataIndex], value, index) : value[column.dataIndex]}</td>
            ))}</tr>
        ))
    }
    render() {
        const { columns, data } = this.props
        if (!(columns && columns.length)) return <div>columns 有误</div>;

        return (
            <table className='tableList'>
                <thead>
                    <tr>
                        {columns.map((v, i) => (
                            <th key={i}>{v.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {this.getTbody(columns, data)}
                </tbody>
            </table>
        )
    }
};