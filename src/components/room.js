import { h, render } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

import { SmartChatBox } from '../containers/smart-chat-box';
import { BingoBoard } from './bingo-board';
import { EventLog } from './event-log';
import { Players } from './players';

export const Room = (props) => {
  const {
    room,
    user,
    toggleCell
  } = props;

  const {
    room_id,
    name,
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
            <div class="mb-2">
              <h1>{name} <small>created by {owner && owner.name}</small></h1>
            </div>

            <BingoBoard board={board} room={room} toggleCell={toggleCell} />
          </div>
        </div>

        <div class="flex-1">
          <div class="section">
            <h2>Players</h2>
            <Players players={players} />
          </div>

          <div class="section">
            <h2>Log</h2>

            <EventLog events={events} room={room} />

            <SmartChatBox roomId={room_id} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
