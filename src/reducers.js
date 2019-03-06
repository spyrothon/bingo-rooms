import _ from 'lodash';
import dotProp from 'dot-prop-immutable';

import {
  REQUEST_ROOM,
  RECEIVE_ROOM,
  REQUEST_ROOMS,
  RECEIVE_ROOMS,
  RECEIVE_EVENT,
  RECEIVE_EVENT_HISTORY
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

    case RECEIVE_EVENT: {
      const { room_id, event } = action.data;
      return dotProp.set(
        state,
        `rooms.${room_id}.events`,
        events => [...events, event]
      );
    }

    case RECEIVE_EVENT_HISTORY: {
      const { room_id, events } = action.data;
      const newState = dotProp.set(
        state,
        `rooms.${room_id}.events`,
        events
      );
      console.log(newState);
      return newState;
    }

    default:
      return state;
  }
}
