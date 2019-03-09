import { removeTeam } from '../actions';

export class RemoveTeamCommand {
  static get hint() { return {
    name: "removeteam",
    grammar: "/removeteam/team_name",
    description: "Remove a team from the room"
  } };

  constructor(roomId, dispatch) {
    this.roomId = roomId;
    this.dispatch = dispatch;
  }

  call([name]) {
    const { dispatch, roomId } = this;

    return dispatch(removeTeam(roomId, name));
  }
}
