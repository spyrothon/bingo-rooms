import { generateBoard } from '../actions';

export class GenerateBoardCommand {
  static get hint() { return {
    name: "generate",
    grammar: "/generate",
    description: "Generate a new board for the room"
  } };

  constructor(roomId, dispatch) {
    this.roomId = roomId;
    this.dispatch = dispatch;
  }

  call(args) {
    const { dispatch, roomId } = this;

    return dispatch(generateBoard(roomId));
  }
}
