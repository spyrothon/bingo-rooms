import {
  RECEIVE_ROOM
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
