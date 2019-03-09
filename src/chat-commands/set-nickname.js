import { setNickname } from '../actions';

export class SetNicknameCommand {
  static get hint() { return {
    name: "nick",
    grammar: "/nick/new_nickname",
    description: "Change your nickname in this room"
  } };

  constructor(roomId, dispatch) {
    this.roomId = roomId;
    this.dispatch = dispatch;
  }

  call([nickname]) {
    const { dispatch, roomId } = this;

    return dispatch(setNickname(roomId, nickname));
  }
}
