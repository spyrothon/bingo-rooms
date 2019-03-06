import { h, render } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

export const Teams = (props) => {
  const {
    teams
  } = props;

  return (
    <div class="teams">
      <p>{teams.length} Teams</p>
      <ul>
        { _.map(teams, (team) => <li>{team}</li>)}
      </ul>
    </div>
  );
}
