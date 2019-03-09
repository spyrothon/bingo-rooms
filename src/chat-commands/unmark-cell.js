import { unmarkCell } from '../actions';

export class UnmarkCellCommand {
  static get hint() { return {
    name: "unmarkcell",
    grammar: "/unmarkcell/index",
    description: "Unmark a cell on the board for your team"
  } };

  constructor(roomId, dispatch) {
    this.roomId = roomId;
    this.dispatch = dispatch;
  }

  call([cellIndexString, team]) {
    const { dispatch, roomId } = this;
    const cellIndex = parseInt(cellIndexString);

    return dispatch(unmarkCell(roomId, cellIndex, team));
  }
}
