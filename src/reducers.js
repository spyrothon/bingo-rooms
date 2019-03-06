import _ from 'lodash';
import dotProp from 'dot-prop-immutable';

import {
  REQUEST_ROOM,
  RECEIVE_ROOM,
  REQUEST_ROOMS,
  RECEIVE_ROOMS,
  RECEIVE_EVENTS,
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
      return dotProp.merge(state, `rooms.${room.room_id}`, room);

    case RECEIVE_EVENTS: {
      const { room_id, events } = action.data;
      return dotProp.set(
        state,
        `rooms.${room_id}.events`,
        (roomEvents) => {
          const newEvents = roomEvents.length ? [...roomEvents, ...events] : events
          return _.sortBy(newEvents, 'timestamp');
        }
      );
    }

    case RECEIVE_EVENT_HISTORY: {
      const { room_id, events } = action.data;
      const newState = dotProp.set(
        state,
        `rooms.${room_id}.events`,
        events
      );
      return newState;
    }

    default:
      return state;
  }
}
