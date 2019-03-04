import {connect} from '../../app/util/connect';
import {store} from '../../app/store';
import { BLBingoBoard } from './bl-bingo-board';

// Subclass and implement `connect` callbacks
export class BLLiveBingoBoard extends connect(store, BLBingoBoard) {
  _mapStateToProps(state) {
    return {
      loading: state.loading,
      board: state.room && state.room.board
    };
  }
  _mapDispatchToEvents(dispatch) {
    return {};
  }
}

customElements.define('bl-live-bingo-board', BLLiveBingoBoard);
