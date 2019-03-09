import { joinRoom } from '../actions';

export class JoinRoomCommand {
  static get hint() { return {
    name: "join",
    grammar: "/join[/nickname[/color]]",
    description: "Add yourself as a player on a team"
  } };

  constructor(roomId, dispatch) {
    this.roomId = roomId;
    this.dispatch = dispatch;
  }

  call([nickname, color]) {
    const { dispatch, roomId } = this;

    return dispatch(joinRoom(roomId, nickname, color));
  }
}
