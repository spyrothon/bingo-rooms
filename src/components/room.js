import { h, render } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

import { BingoBoard } from './bingo-board';
import { ChatBox } from './chat-box';
import { EventLog } from './event-log';
import { Teams } from './teams';

export const Room = (props) => {
  const {
    room,
    markCell,
    unmarkCell,
    sendChatMessage
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
    <div class="room-container container mx-auto">
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
            <h2>Log</h2>

            <EventLog events={events} />

            <ChatBox sendMessage={(content) => sendChatMessage(room_id, content)} />
          </div>
        </div>
      </div>
    </div>
  );
}
