import _ from 'lodash';

import {
  REQUEST_ROOM,
  RECEIVE_ROOM,
  REQUEST_ROOMS,
  RECEIVE_ROOMS
} from "./constants";

const initialState = {
  loading: false,
  rooms: {}
};

export default function(state = initialState, action) {
  switch(action.type) {
    case REQUEST_ROOMS:
      return {
        ...state,
        loading: true
      }
    case RECEIVE_ROOMS:
      const { rooms } = action.data;
      const newRooms = _.keyBy(rooms, 'room_id');

      return {
        ...state,
        loading: false,
        rooms: {
          ...state.rooms,
          ...newRooms
        }
      };

    case REQUEST_ROOM:
      return {
        ...state,
        loading: true
      }
    case RECEIVE_ROOM:
      const { room } = action.data;
      return {
        ...state,
        loading: false,
        rooms: {
          ...state.rooms,
          [room.room_id]: room
        }
      };

    default:
      return state;
  }
}
