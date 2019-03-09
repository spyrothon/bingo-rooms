import { unmarkCell } from '../actions';

export class UnmarkCellCommand {
  static get hint() { return {
    name: "unmark",
    grammar: "/unmark/index",
    description: "Unmark a cell on the board"
  } };

  constructor(roomId, dispatch) {
    this.roomId = roomId;
    this.dispatch = dispatch;
  }

  call([cellIndexString]) {
    const { dispatch, roomId } = this;
    const cellIndex = parseInt(cellIndexString);

    return dispatch(unmarkCell(roomId, cellIndex));
  }
}
