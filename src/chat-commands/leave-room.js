import { leaveRoom } from '../actions';

export class LeaveRoomCommand {
  static get hint() { return {
    name: "leave",
    grammar: "/leave",
    description: "Remove yourself as a player from the room"
  } };

  constructor(roomId, dispatch) {
    this.roomId = roomId;
    this.dispatch = dispatch;
  }

  call(args) {
    const { dispatch, roomId } = this;

    return dispatch(leaveRoom(roomId));
  }
}
