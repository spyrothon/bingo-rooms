import { unmarkCell } from '../actions';

export class UnmarkCellCommand {
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
