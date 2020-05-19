import React, { Component } from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'


const mapStateToProps = state => {
    debugger
  return {
    canUndo: state.undoredoReducer.past.length > 0,
    canRedo: state.undoredoReducer.future.length > 0
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  }
}

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
    <p>
      <button onClick={onUndo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={onRedo} disabled={!canRedo}>
        Redo
      </button>
    </p>
  )

export default UndoRedo = connect(
    mapStateToProps,
    mapDispatchToProps
  )(UndoRedo)