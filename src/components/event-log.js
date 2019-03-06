import { h, render } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

import { Event } from './event';

export const EventLog = (props) => {
  const {
    events
  } = props;

  return (
    <div class="event-log">
      <ul>
        { _.map(events, (event) => <Event event={event} />) }
      </ul>
    </div>
  );
}
