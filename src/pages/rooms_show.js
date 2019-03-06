import { h, render, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import _ from 'lodash';

import { requestRoom } from '../actions';

import { Room } from '../components/room';

class RoomsShow extends Component {
  componentWillMount() {
    const { roomId, requestRoom } = this.props;
    requestRoom(roomId);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { loading, room, roomId, requestRoom } = nextProps;
    if(!room && !loading) {
      requestRoom(roomId);
    }
  }

  render() {
    const {
      loading,
      room
    } = this.props;

    if(loading || !room) return null;

    return (
      <Room room={room} />
    );
  }
}



const mapStateToProps = (state, ownProps) => {
  const { roomId } = ownProps;
  return {
    room: state.rooms[roomId]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({
      requestRoom
    }, dispatch)
  };
}

export const RoomsShowPage = connect(mapStateToProps, mapDispatchToProps)(RoomsShow);
