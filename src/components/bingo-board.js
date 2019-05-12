import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

export class BingoBoard extends Component {
  onCellClick(cellIndex, playerId, ev) {
    const { board, room, toggleCell } = this.props;
    const roomId = room.room_id;

    toggleCell(roomId, cellIndex);
  }

  styleForCell(cell, room) {
    const { players } = room;
    const colors = _.chain(cell.marked_by)
        .map((id) => players[id])
        .sort()
        .map('color')
        .uniq()
        .value();

    switch(colors.length) {
      case 0: return {};
      case 1: return {background: colors[0]};
      default:
        const stopLength = 100/colors.length;
        const stopVariability = 1;
        const stops =
          _.reduce(colors, (acc, color) => {
            const startPercent = acc.lastLocation;
            const stopPercent = acc.lastLocation + stopLength - stopVariability;
            const newEntry = `${color} ${startPercent}% ${stopPercent}%`;
            return {
              ...acc,
              entries: [...acc.entries, newEntry],
              lastLocation: stopPercent + stopVariability
            };
          }, {entries: [], lastLocation: 0});
        return {
          background: `linear-gradient(-42deg, ${stops.entries.join(',')})`
        };
    }
  }

  render() {
    const {
      board,
      playerId,
      room,
      toggleCell
    } = this.props;
    const { cells } = board;
    const { players } = room;
    const player = players[playerId];


    return (
      <div class="bingo-board">
        { _.map(cells, (cell, idx) => {
            return <span
                class="bingo-cell"
                style={this.styleForCell(cell, room)}
                onClick={this.onCellClick.bind(this, idx, playerId)}
              >
              <span>{cell.goal.name}</span>
            </span>;
          })
        }
      </div>
    );
  }
}
