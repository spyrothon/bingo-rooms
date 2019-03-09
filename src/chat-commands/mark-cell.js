import { markCell } from '../actions';

export class MarkCellCommand {
  static get hint() { return {
    name: "markcell",
    grammar: "/markcell/index",
    description: "Mark a cell on the board for your team"
  } };

  constructor(roomId, dispatch) {
    this.roomId = roomId;
    this.dispatch = dispatch;
  }

  call([cellIndexString, team]) {
    const { dispatch, roomId } = this;
    const cellIndex = parseInt(cellIndexString);

    return dispatch(markCell(roomId, cellIndex, team));
  }
}
