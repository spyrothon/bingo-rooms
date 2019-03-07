import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

export class BingoBoard extends Component {
  toggleCell(cellIndex, ev) {
    const { board, roomId, markCell, unmarkCell } = this.props;
    const cell = board.cells[cellIndex];
    const markedBy = cell.marked_by;

    if(markedBy.includes("The Team")) {
      unmarkCell(roomId, cellIndex, "The Team");
    } else {
      markCell(roomId, cellIndex, "The Team");
    }
  }

  render() {
    const {
      board,
      roomId,
      markCell,
      unmarkCell
    } = this.props;

    const { cells } = board;

    return (
      <div class="bingo-board">
        { _.map(cells, (cell, idx) => (
            <span class="bingo-cell" onClick={this.toggleCell.bind(this, idx)}>
              <span>{cell.goal.name}</span>
              <small>{cell.marked_by.join(', ')}</small>
            </span>
          ))
        }
      </div>
    );
  }
}
