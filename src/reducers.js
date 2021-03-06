import _ from 'lodash';
import dotProp from 'dot-prop-immutable';
import Cookies from 'js-cookie';

import { Actions } from "./constants";

// Persist sessions across page refreshes via local cookies. These cookies are
// _not_ sent to the API server, which is why `window.sessionId` gets set.
const existingSession = Cookies.get('bl-session-id') || window.sessionId;
window.sessionId = existingSession;

const initialState = {
  loading: false,
  rooms: {},
  sessionId: existingSession || null,
  user: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case Actions.REQUEST_ROOMS:
      return {
        ...state,
        loading: { ...state.loading, rooms: true }
      }
    case Actions.RECEIVE_ROOMS:
      const { rooms } = action.data;
      const newRooms = _.keyBy(rooms, 'room_id');

      return {
        ...state,
        loading: { ...state.loading, rooms: false },
        rooms: {
          ...state.rooms,
          ...newRooms
        }
      };

    case Actions.REQUEST_ROOM:
      return {
        ...state,
        loading: { ...state.loading, room: true }
      }
    case Actions.RECEIVE_ROOM:
      const { room } = action.data;
      const newRoomState = dotProp.merge(state, `rooms.${room.room_id}`, room);
      return {
        ...newRoomState,
        loading: { ...state.loading, room: false }
      }

    case Actions.RECEIVE_EVENTS: {
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

    case Actions.ROOM_CREATED: {
      const { room } = action.data;
      return {
        ...state
      }
    }

    case Actions.RECEIVE_EVENT_HISTORY: {
      const { room_id, events } = action.data;
      const newState = dotProp.set(
        state,
        `rooms.${room_id}.events`,
        events
      );
      return newState;
    }

    case Actions.REQUEST_AUTHENTICATION:
      return {
        ...state,
        loading: {
          ...state.loading,
          auth: true
        }
      };

    case Actions.RECEIVE_AUTHENTICATION:
      const { sessionId } = action.data;
      window.sessionId = sessionId;
      Cookies.set('bl-session-id', sessionId);
      return {
        ...state,
        loading: { ...state.loading, auth: false },
        sessionId
      };

    case Actions.RECEIVE_LOGOUT:
      window.sessionId = null;
      Cookies.remove('bl-session-id');
      return { ...state, sessionId: null };

    default:
      return state;
  }
}
