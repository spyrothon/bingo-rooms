import {
  RECEIVE_ROOM,
  RECEIVE_ROOMS,
  RECEIVE_EVENTS,
  RECEIVE_EVENT_HISTORY,
  RECEIVE_AUTHENTICATION
} from './constants';
import { socket } from './store';

const SERVER_HOST = "http://localhost:3000";

const defaultHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-BL-Session': window.sessionId
});



// //
// Action creators
// //

export function loginUser(username, password) {
  return dispatch => {
    fetch(`${SERVER_HOST}/api/sessions`, {
      headers: defaultHeaders(),
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      return dispatch(receiveAuthentication(response.data.session_id));
    });
  }
}

export function logoutUser() {
  return dispatch => {
    fetch(`${SERVER_HOST}/api/sessions/delete`, {
      headers: defaultHeaders(),
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      return dispatch(receiveLogout());
    });
  }
}

export function requestRoom(roomId) {
  return dispatch => {
    fetch(`${SERVER_HOST}/api/rooms/${roomId}`, {
      headers: defaultHeaders(),
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
      headers: defaultHeaders(),
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

export function receiveAuthentication(sessionId) {
  return {
    type: RECEIVE_AUTHENTICATION,
    data: {
      sessionId: sessionId
    }
  }
}

export function receiveLogout() {
  return {
    type: RECEIVE_LOGOUT,
    data: {
    }
  }
}



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

export function receiveEvents(room_id, events) {
  return {
    type: RECEIVE_EVENTS,
    data: {
      room_id: room_id,
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
