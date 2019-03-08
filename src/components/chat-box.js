import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';


export class ChatBox extends Component {
  submitOnEnter(ev) {
    const { sendMessage } = this.props;
    const { key, shiftKey, target } = ev;
    const message = target.value;

    if(key == "Enter" && !shiftKey) {
      ev.preventDefault();
      if(message.trim() != "") {
        sendMessage(message);
        target.value = "";
        return;
      }
    }
  }

  render() {
    return (
      <div class="chat">
        <div class="chat-box">
          <textarea
            id="message-input"
            class="bg-black text-white w-full px-2 py-1 mt-2 rounded block"
            onKeyDown={this.submitOnEnter.bind(this)}
            placeholder="Send a message or command"
          ></textarea>
        </div>
      </div>
    );
  }
}
