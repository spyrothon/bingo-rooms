import { h, render } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

import { BingoBoard } from './bingo-board';

export const Room = (props) => {
  const {
    room
  } = props;

  return (
    <div class="container mx-auto">
      <div class="flex">
        <div class="flex-1">
          <div class="section">
            <h1>{room.name}</h1>

            <BingoBoard board={room.board} />
          </div>
        </div>

        <div class="flex-1">
          <div class="section">
            <h2>Teams</h2>
            <p>{room.teams.length} Teams</p>
            <ul>
              { _.map(room.teams, (team) => <li>{team}</li>)}
            </ul>

            <p>{room.players.length} Players</p>
            <ul>
              { _.map(room.players, (player) => <li>{player}</li>)}
            </ul>
          </div>

          <div class="section">
            <h2>Events</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
