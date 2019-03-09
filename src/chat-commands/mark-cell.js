import { markCell } from '../actions';

export class MarkCellCommand {
  static get hint() { return {
    name: "mark",
    grammar: "/mark/index",
    description: "Mark a cell on the board"
  } };

  constructor(roomId, dispatch) {
    this.roomId = roomId;
    this.dispatch = dispatch;
  }

  call([cellIndexString]) {
    const { dispatch, roomId } = this;
    const cellIndex = parseInt(cellIndexString);

    return dispatch(markCell(roomId, cellIndex));
  }
}
