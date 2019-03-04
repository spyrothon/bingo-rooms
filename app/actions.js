import {
  RECEIVE_ROOM,
  RECEIVE_ROOM_EVENTS
} from './constants';

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

export function requestRoomEvents(roomId) {
  return dispatch => {
    fetch(`${SERVER_HOST}/api/rooms/${roomId}/events`, {
      headers: defaultHeaders,
      credentials: 'same-origin',
      method: 'GET'
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      return dispatch(receiveRoomEvents(roomId, response.data.events));
    });
  }
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

export function receiveRoomEvents(roomId, events) {
  return {
    type: RECEIVE_ROOM_EVENTS,
    data: {
      roomId: roomId,
      events: events
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
