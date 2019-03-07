import { h, render } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

import { BingoBoard } from './bingo-board';
import { EventLog } from './event-log';
import { Teams } from './teams';

export const Room = (props) => {
  const {
    room,
    markCell,
    unmarkCell
  } = props;

  const {
    room_id,
    name,
    teams,
    players,
    board,
    events,
    owner
  } = room;

  return (
    <div class="container mx-auto">
      <div class="flex">
        <div class="flex-1">
          <div class="section">
            <h1>{name} <small>created by {owner && owner.name}</small></h1>

            <BingoBoard board={board} roomId={room_id} markCell={markCell} unmarkCell={unmarkCell} />
          </div>
        </div>

        <div class="flex-1">
          <div class="section">
            <h2>Teams</h2>
            <Teams teams={teams} />

            <p>{players.length} Players</p>
            <ul>
              { _.map(players, (player) => <li>{player}</li>)}
            </ul>
          </div>

          <div class="section">
            <h2>Events</h2>

            <EventLog events={events} />
          </div>
        </div>
      </div>
    </div>
  );
}
