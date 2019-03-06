import { h, render } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

export const Room = (props) => {
  const {
    room
  } = props;

  return (
    <div class="container mx-auto">
      <div class="flex">
        <div class="flex-grow">
          <div class="section">
            <h1>{room.name}</h1>
          </div>
        </div>

        <div class="flex-grow">
          <div class="section">
            <h2>Teams</h2>
            <p>{room.teams.length} Teams</p>
            <p>{room.players.length} Players</p>
          </div>

          <div class="section">
            <h2>Events</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
