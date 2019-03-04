import {
  REQUEST_ROOM,
  RECEIVE_ROOM,
  REQUEST_ROOM_EVENTS,
  RECEIVE_ROOM_EVENTS
} from "./constants";

const initialState = {
  loading: false,
  loadingEvents: false,
  room: null,
  events: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case REQUEST_ROOM:
      return {
        ...state,
        loading: true
      }
    case RECEIVE_ROOM:
      return {
        ...state,
        loading: false,
        room: action.data.room
      };

    case REQUEST_ROOM_EVENTS:
      return {
        ...state,
        loadingEvents: true
      }
    case RECEIVE_ROOM_EVENTS:
      return {
        ...state,
        loadingEvents: false,
        events: action.data.events
      };

    default:
      return state;
  }
}
