/*
 * @Date: 2020-05-19 09:45:54
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-19 11:45:03
 */
import undoable, { distinctState, includeAction } from 'redux-undo';

let defaultState = {
    // past:[],
    // present:{

    // },
    // future:[],
    undoOneValue: '1',
    undoTwoValue: '2',
    undoThreeValue: '3',
    undoForeValue: '4',
    undoFiveValue: '5',
};

const undoRedo = (state = defaultState, action) => {
    switch (action.type) {
        case "ONE_ALL_VALUE": {
            return {
                ...state,
                ...action.data
            }
        }
        default:
            return state;
    }
};

const undoRedos = undoable(undoRedo);
// const undoRedos = undoable(undoRedo, {
//     filter: includeAction() // 可以过滤掉不需要撤销的操作
// });

export default {
    undoRedos
};