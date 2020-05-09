/*
 * @Date: 2020-05-07 10:48:28
 * @LastEditors: gzk
 * @LastEditTime: 2020-05-08 17:39:49
 */
// ======================================================
// reducer 中心此下面的 state会挂到总state下面 state.User={}
// ======================================================

const initState = '';

function reducer(state = initState, action) {
  if (action.type === 'EDIT') {
    return action.data;
  }
  return state;
}

// ======================================================
// actions 触发reducer 改变 state
// ======================================================
// 行为--改变用户id
function editor(data) {
  return {
    type: 'EDIT',
    data,
  };
}

export default {
  reducer,
  actions: {
    editor,
  },
};
