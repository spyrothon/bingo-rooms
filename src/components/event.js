import { h, render } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';
import { DateTime } from 'luxon';


const displayForEvent = (event, room) => {
  const { type, raw_data } = event;
  const data = JSON.parse(raw_data);
  switch(type) {
    case 'room_created': {
      const { name } = data;
      return <span>Room Created - <small>Name: {name}</small></span>;
    }

    case 'board_updated': {
      const { board } = data;
      return <span>Board Updated - <small>Size: {board.size}, Seed: {board.seed}</small></span>;
    }

    case 'player_joined': {
      const { player } = data;
      const { user } = player;
      return <span><strong>{user.name}</strong> joined the room</span>;
    }

    case 'player_left': {
      const { player, nickname } = data;
      const { user } = player;
      return <span><strong>{user.name}</strong> left the room</span>;
    }

    case 'player_nickname_changed': {
      const { player, nickname } = data;
      const { user } = player;
      return <span><strong>{user.name}</strong> changed their nickname to <strong>{nickname}</strong></span>;
    }

    case 'player_color_changed': {
      const { player, color } = data;
      const { user } = player;
      return <span><strong>{user.name}</strong> changed their color to <strong style={{color: color}}>{color}</strong></span>;
    }

    case 'cell_marked': {
      const { player, cell_index, cell } = data;
      return <span>
        marked <em>{cell.goal.name}</em>
      </span>;
    }

    case 'cell_unmarked': {
      const { player, cell_index, cell } = data;
      return <span>
        unmarked <em>{cell.goal.name}</em>
      </span>;
    }

    case 'chat_message_sent': {
      const { content } = data;
      return <span>
        {content}
      </span>;
    }

    default:
      return <span>{type}</span>;
  }
}

export const Event = (props) => {
  const {
    event,
    room
  } = props;

  const {
    type,
    raw_data,
    raw_meta,
    room_id,
    timestamp
  } = event;

  const data = JSON.parse(raw_data);
  const meta = JSON.parse(raw_meta);
  const { user } = meta;
  const userName = user ? user.name : 'unknown';

  const formattedTime = DateTime.fromISO(event.timestamp).toLocaleString(DateTime.TIME_SIMPLE);


  return (
    <div class="event-log-event my-2">
      <div class="text-grey-dark">
        {userName} <small>- {formattedTime}</small>
      </div>
      <div class="ml-4 mt-1">{displayForEvent(event, room)}</div>
    </div>
  );
}
