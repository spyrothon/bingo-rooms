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

    case 'team_added': {
      const { name } = data;
      return <span>Team Added - <small>Name: {name}</small></span>;
    }

    case 'team_removed': {
      const { name } = data;
      return <span>Team Removed - <small>Name: {name}</small></span>;
    }

    case 'player_added': {
      const { user_id, user } = data;
      const { name } = user;
      return <span>added <strong>{name}</strong> as a player</span>;
    }

    case 'player_team_joined': {
      const { player_id, team: teamName } = data;
      const player = room.players[player_id];
      const team = room.teams.find((team) => team.name == teamName);
      return <span><strong>{player.name}</strong> joined team <strong style={{color: team.color}}>{team}</strong></span>;
    }

    case 'player_team_changed': {
      const { player_id, old_team: oldTeamName, team: teamName } = data;
      const player = room.players[player_id];
      const oldTeam = room.teams.find((team) => team.name == oldTeamName);
      const team = room.teams.find((team) => team.name == teamName);
      return <span>
        <strong>{player.name}</strong> changed teams from
        <strong style={{color: oldTeam.color}}> {oldTeamName}</strong> to
        <strong style={{color: team.color}}> {teamName}</strong>
      </span>;
    }

    case 'cell_marked': {
      const { player, team, cell_index, cell } = data;
      return <span>
        <em>{cell.goal.name}</em> marked for team <em>{team}</em>
      </span>;
    }

    case 'cell_unmarked': {
      const { player, team, cell_index, cell } = data;
      return <span>
        <em>{cell.goal.name}</em> marked for team <em>{team}</em>
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
