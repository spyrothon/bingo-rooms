import { setColor } from '../actions';

export class SetColorCommand {
  static get hint() { return {
    name: "color",
    grammar: "/color/new_color",
    description: "Change your color in this room. Color can be a common name or hex code (ex: #abcdef)"
  } };

  constructor(roomId, dispatch) {
    this.roomId = roomId;
    this.dispatch = dispatch;
  }

  call([nickname]) {
    const { dispatch, roomId } = this;

    return dispatch(setColor(roomId, nickname));
  }
}
