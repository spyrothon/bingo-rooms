import { h, render, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import _ from 'lodash';

import {
  createRoom,
  requestRooms
} from '../actions';

class RoomsIndex extends Component {
  componentWillMount() {
    const { requestRooms } = this.props;
    requestRooms();
  }

  render() {
    const {
      rooms,
      createRoom
    } = this.props;

    return (
      <div class="container mx-auto">
        <h1>Bingo Rooms</h1>

        <table class="table">
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Name</th>
              <th>Participants</th>
              <th>Last Active</th>
            </tr>
          </thead>

          <tbody>
            { _.map(rooms, (room) => {
                return (
                  <tr>
                    <td>{room.room_id}</td>
                    <td><a href={`/r/${room.room_id}`}>{room.name}</a></td>
                    <td>{room.players.length} Players / {room.teams.length} Teams</td>
                    <td>{room.last_updated}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

        <button onClick={createRoom}>Create a Room</button>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    rooms: state.rooms
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({
      requestRooms,
      createRoom
    }, dispatch)
  };
}

export const RoomsIndexPage = connect(mapStateToProps, mapDispatchToProps)(RoomsIndex);
