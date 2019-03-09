import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

import { matchingCommands } from '../command-interpreter';


export class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      canSend: false,
      isCommand: false,
      commandHints: []
    }
  }

  handleMessageChange(event) {
    const newContent = event.target.value;
    const canSend = newContent.trim() != '';
    const isCommand = newContent[0] == '/';
    const commandHints = isCommand ? matchingCommands(newContent.split('/')[1]) : [];

    this.setState({
      message: event.target.value,
      canSend: canSend,
      isCommand: isCommand,
      commandHints: commandHints
    });

    event.preventDefault();
  }

  maybeSendMessage(ev) {
    const { key, shiftKey } = ev;
    const shouldSend = (key == "Enter" && !shiftKey);
    const { sendMessage } = this.props;
    const { message, canSend } = this.state;

    if(!(canSend && shouldSend)) return;

    sendMessage(message);
    ev.target.value = "";
    this.setState({
      message: "",
      canSend: false,
      isCommand: false,
      commandHints: []
    });
    ev.preventDefault();
  }

  render() {
    const { message, canSend, isCommand, commandHints } = this.state;

    return (
      <div class="chat">
        <div class="chat-box">
          <textarea
            id="message-input"
            class="bg-black text-white w-full p-2 mt-2 rounded block"
            onKeyDown={this.maybeSendMessage.bind(this)}
            onInput={this.handleMessageChange.bind(this)}
            placeholder="Send a message or type `/` to start a command"
            value={message}
          ></textarea>
        </div>
        <div class="chat-command-hints">
          { isCommand &&
            _.map(commandHints, ({name, grammar, description}) => {
              return <div class="py-1">
                <div><strong>{name}</strong> - <em>{grammar}</em></div>
                <div class="ml-4">{description}</div>
              </div>;
            })
          }
        </div>
      </div>
    );
  }
}
