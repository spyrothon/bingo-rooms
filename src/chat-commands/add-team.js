import { addTeam } from '../actions';

export class AddTeamCommand {
  static get hint() { return {
    name: "addteam",
    grammar: "/addteam/team_name[/color]",
    description: "Add a team to the room"
  } };

  constructor(roomId, dispatch) {
    this.roomId = roomId;
    this.dispatch = dispatch;
  }

  call([name, argColor]) {
    const { dispatch, roomId } = this;
    const color = argColor || 'white';

    return dispatch(addTeam(roomId, name, color));
  }
}
