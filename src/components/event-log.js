import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

import { Event } from './event';

export class EventLog extends Component {
  constructor(props) {
    super(props);
    this.containerElement = null;
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const container = this.containerElement;
    console.log(container.scrollTop, container.scrollHeight);
    if(container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  render() {
    const {
      events
    } = this.props;

    return (
      <div class="event-log" ref={(el) => this.containerElement = el}>
        { _.map(events, (event) => <Event event={event} />) }
      </div>
    );
  }
}
