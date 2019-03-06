import { h, render } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

export const BingoBoard = (props) => {
  const {
    board
  } = props;
  const { cells } = board;

  return (
    <div class="bingo-board">
      { _.map(cells, (cell) => (
          <span class="bingo-cell">
            <span>{cell.goal.name}</span>
            <small>{cell.marked_by.join(', ')}</small>
          </span>
        ))
      }
    </div>
  );
}
