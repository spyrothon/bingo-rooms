import { h, render } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';


const displayForEvent = (event) => {
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

    case 'team_added': {
      const { team } = data;
      return <span>Team Added - <small>Name: {team}</small></span>;
    }

    case 'team_removed': {
      const { team } = data;
      return <span>Team Removed - <small>Name: {team}</small></span>;
    }

    case 'player_added': {
      const { player } = data;
      return <span>Player Added - <small>Name: {player}</small></span>;
    }

    case 'player_removed': {
      const { player } = data;
      return <span>Player Removed - <small>Name: {player}</small></span>;
    }

    default:
      return <span>{type}</span>;
  }
}

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
      {displayForEvent(event)}
    </div>
  );
}
