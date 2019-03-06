import { h, render } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

export const Event = (props) => {
  const {
    event
  } = props;

  const {
    type,
    raw_data,
    room_id,
    timestamp
  } = event;

  const data = JSON.parse(raw_data);

  return (
    <div class="event-log-event">
      <span class="text-grey-dark">[{event.timestamp}]: </span>
      {event.type}
    </div>
  );
}
