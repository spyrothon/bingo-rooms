import {connect} from '../../app/util/connect';
import {store} from '../../app/store';
import { BLEventLog } from './bl-event-log';

export class BLLiveEventLog extends connect(store, BLEventLog) {
  _mapStateToProps(state) {
    return {
      loading: state.loadingEvents,
      events: state.events
    };
  }
  _mapDispatchToEvents(dispatch) {
    return {};
  }
}

customElements.define('bl-live-event-log', BLLiveEventLog);
