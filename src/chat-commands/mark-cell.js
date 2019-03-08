import { markCell } from '../actions';

export class MarkCellCommand {
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
