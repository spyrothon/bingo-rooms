import { route } from 'preact-router';

import { Actions } from './constants';
import { socket } from './store';

const API_HOST = "http://localhost:3000/api/play";

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
    dispatch(requestAuthentication());
    fetch(`${API_HOST}/sessions`, {
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
      return dispatch(receiveAuthentication(response.data.session_id, response.data.user));
    });
  }
}

export function logoutUser() {
  return dispatch => {
    fetch(`${API_HOST}/sessions/delete`, {
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

export function requestRoom(roomId) {
  return dispatch => {
    fetch(`${API_HOST}/rooms/${roomId}`, {
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
    fetch(`${API_HOST}/rooms`, {
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

export function createRoom() {
  return dispatch => {
    fetch(`${API_HOST}/rooms`, {
      headers: defaultHeaders(),
      credentials: 'same-origin',
      method: 'POST'
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      const { room } = response.data;
      dispatch(roomCreated(room));
      route(`/r/${room.room_id}`);
      return true;
    });
  }
}

export function markCell(roomId, cellIndex, team) {
  return dispatch => {
    fetch(`${API_HOST}/rooms/${roomId}/mark_cell`, {
      headers: defaultHeaders(),
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        cell_index: cellIndex,
        team: team
      })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      return true;
    });
  }
}

export function unmarkCell(roomId, cellIndex, team) {
  return dispatch => {
    fetch(`${API_HOST}/rooms/${roomId}/unmark_cell`, {
      headers: defaultHeaders(),
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        cell_index: cellIndex,
        team: team
      })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      return true;
    });
  }
}




// //
// Actions
// //

export function requestAuthentication() {
  return {
    type: Actions.REQUEST_AUTHENTICATION,
    data: {}
  }
}

export function receiveAuthentication(sessionId, user) {
  return {
    type: Actions.RECEIVE_AUTHENTICATION,
    data: {
      sessionId: sessionId,
      user: user
    }
  }
}

export function receiveLogout() {
  return {
    type: Actions.RECEIVE_LOGOUT,
    data: {}
  }
}



export function receiveRoom(room) {
  return {
    type: Actions.RECEIVE_ROOM,
    data: {
      room: room
    }
  }
}

export function receiveRooms(rooms) {
  return {
    type: Actions.RECEIVE_ROOMS,
    data: {
      rooms: rooms
    }
  }
}

export function roomCreated(room) {
  return {
    type: Actions.ROOM_CREATED,
    data: {
      room: room
    }
  }
}

export function receiveEventHistory(room_id, events) {
  return {
    type: Actions.RECEIVE_EVENT_HISTORY,
    data: {
      room_id: room_id,
      events: events
    }
  }
}

export function receiveEvents(room_id, events) {
  return {
    type: Actions.RECEIVE_EVENTS,
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
