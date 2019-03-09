import { h, render, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import _ from 'lodash';

import {
  createRoom,
  requestRooms
} from '../actions';

import { RoomForm } from '../components/room-form';


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
        <div class="flex">
          <div class="section">
            <h1>Bingo Rooms</h1>

            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Created By</th>
                  <th>Players</th>
                  <th>Last Active</th>
                </tr>
              </thead>

              <tbody>
                { _.map(rooms, (room) => {
                    const { owner } = room;
                    return (
                      <tr>
                        <td><a href={`/r/${room.room_id}`}>{room.name}</a></td>
                        <td>{owner && owner.name}</td>
                        <td>{room.players.length} Players</td>
                        <td>{room.last_updated}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>

          <div class="section flex-1">
            <RoomForm onSubmit={createRoom} />
          </div>
        </div>
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
