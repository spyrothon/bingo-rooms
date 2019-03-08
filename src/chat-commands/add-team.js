import { addTeam } from '../actions';

export class AddTeamCommand {
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
