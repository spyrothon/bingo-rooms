import { h, render } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

export const Players = (props) => {
  const {
    players
  } = props;

  return (
    <div class="players">
      <p>{players.length} Players</p>
      <ul>
        { _.map(players, (player) => {
            return <li style={{color: player.color}}>
              {player.nickname}
            </li>;
          })
        }
      </ul>
    </div>
  );
}
