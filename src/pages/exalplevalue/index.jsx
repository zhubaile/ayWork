/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { actions, connect } from '@combin';
import Redobtn from '../../components/reduxundo';

class ExalpleValue extends Component {

    constructor(props) {
        super(props);
        const { present: { undoOneValue,undoTwoValue,undoThreeValue,undoForeValue,undoFiveValue, } } = this.props.undoredoReducer;
        this.state = {
            contentPaeams: {
                undoOneValue,
                undoTwoValue,
                undoThreeValue,
                undoForeValue,
                undoFiveValue,
            }, // 弹框内的input的值
        };
    }
    editBtn(){
        const valueObj = this.state.contentPaeams;
        this.props.setOneAllValue(valueObj);
    }
    editChangeValue(e){
        let value = e.target.value, names = e.target.name;
        const contentPaeams = Object.assign({},this.state.contentPaeams);
        contentPaeams[names] = value;
        this.setState({
            contentPaeams,
        })
    }

    render() {
        const { undoOneValue,undoTwoValue,undoThreeValue,undoForeValue,undoFiveValue } = this.state.contentPaeams;
        const { undoredoReducer: { present} } = this.props;

        return (
            <div className='tableData'>
                <input style={{textAlign:'center'}} type="text" value={undoOneValue} name="undoOneValue" onChange={this.editChangeValue.bind(this)} />
                <input style={{textAlign:'center'}} type="text" value={undoTwoValue} name="undoTwoValue" onChange={this.editChangeValue.bind(this)} />
                <input style={{textAlign:'center'}} type="text" value={undoThreeValue} name="undoThreeValue" onChange={this.editChangeValue.bind(this)} />
                <input style={{textAlign:'center'}} type="text" value={undoForeValue} name="undoForeValue" onChange={this.editChangeValue.bind(this)} />
                <input style={{textAlign:'center'}} type="text" value={undoFiveValue} name="undoFiveValue" onChange={this.editChangeValue.bind(this)} />
                <button onClick={this.editBtn.bind(this)}>
                    修改按钮
                </button>
                <div>
                    {`本界面输入框内容为${undoOneValue}--${undoTwoValue}--${undoThreeValue}--${undoForeValue}--${undoFiveValue}`}
                </div>
                <div>
                    {`reduc的值${present.undoOneValue}-----${present.undoTwoValue}-----${present.undoThreeValue}-----${present.undoForeValue}-----${present.undoFiveValue}`}
                </div>
                <Redobtn />
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            undoredoReducer: state.undoredoReducer, state,
        }
    },
    { ...actions.undoredoAction },
    null
)(ExalpleValue);