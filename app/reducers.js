import {
  REQUEST_ROOM,
  RECEIVE_ROOM
} from "./constants";

const initialState = {
  loading: false,
  room: null
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

    default:
      return state;
  }
}
