import {
  RECEIVE_ROOM,
  RECEIVE_ROOMS,
  RECEIVE_EVENT,
  RECEIVE_EVENT_HISTORY
} from './constants';
import { socket } from './store';

const SERVER_HOST = "http://localhost:3000";

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};



// //
// Action creators
// //

export function requestRoom(roomId) {
  return dispatch => {
    fetch(`${SERVER_HOST}/api/rooms/${roomId}`, {
      headers: defaultHeaders,
      credentials: 'same-origin',
      method: 'GET'
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      return dispatch(receiveRoom(response.data.room));
    });
  }
}

export function requestRooms() {
  return dispatch => {
    fetch(`${SERVER_HOST}/api/rooms`, {
      headers: defaultHeaders,
      credentials: 'same-origin',
      method: 'GET'
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      return dispatch(receiveRooms(response.data.rooms));
    });
  }
}

export function subscribeToRoomEvents(roomId) {
  socket.send({
    command: "subscribe",
    topic: roomId
  })
}

export function unsubscribeFromRoomEvents(roomId) {
  socket.send({
    command: "unsubscribe",
    topic: roomId
  })
}



// //
// Actions
// //

export function receiveRoom(room) {
  return {
    type: RECEIVE_ROOM,
    data: {
      room: room
    }
  }
}

export function receiveRooms(rooms) {
  return {
    type: RECEIVE_ROOMS,
    data: {
      rooms: rooms
    }
  }
}

export function receiveEventHistory(room_id, events) {
  return {
    type: RECEIVE_EVENT_HISTORY,
    data: {
      room_id: room_id,
      events: events
    }
  }
}

export function receiveEvent(room_id, event) {
  return {
    type: RECEIVE_EVENT,
    data: {
      room_id: room_id,
      event: event
    }
  }
}



// //
// Utilities
// //

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300 || response.status == 422) {
    return response;
  } else {
    throw response;
  }
};

function parseJSON(response) {
  return response.json();
};
