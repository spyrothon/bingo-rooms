import { joinTeam } from '../actions';

export class JoinTeamCommand {
  static get hint() { return {
    name: "join",
    grammar: "/join/team_name",
    description: "Add yourself as a player on a team"
  } };

  constructor(roomId, dispatch) {
    this.roomId = roomId;
    this.dispatch = dispatch;
  }

  call([team]) {
    const { dispatch, roomId } = this;

    return dispatch(joinTeam(roomId, team));
  }
}
