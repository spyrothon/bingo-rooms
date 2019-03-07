import { h, render } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

export const RoomForm = (props) => {
  const submitForm = (ev) => {
    ev.preventDefault();

    const { onSubmit } = props;
    onSubmit();
  }

  return (
    <div class="room-form">
      <form onSubmit={submitForm}>
        <input type="submit" value="Create Room" />
      </form>
    </div>
  );
}
