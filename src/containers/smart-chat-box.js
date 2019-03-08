import { h, render, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import _ from 'lodash';

import * as Actions from '../actions';
import { ChatBox } from '../components/chat-box';


const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { roomId } = ownProps;

  return {
    dispatch,
    ...bindActionCreators({
      sendMessage: (message) => Actions.parseAndDispatchMessage(roomId, message)
    }, dispatch)
  };
}


export const SmartChatBox = connect(mapStateToProps, mapDispatchToProps)(ChatBox);
