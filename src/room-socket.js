import ReconnectingWebSocket from './lib/reconnecting-websocket';
import {
  receiveRoom,
  receiveEvents,
  receiveEventHistory
} from './actions';

export class RoomSocket {
  constructor(url, dispatch) {
    this.rws = new ReconnectingWebSocket(url);
    this.rws.onopen     = this.onopen.bind(this);
    this.rws.onmessage  = this.onmessage.bind(this);
    this.rws.onerror    = this.onerror.bind(this);
    this.rws.onclose    = this.onclose.bind(this);
    this.rws.onclose    = this.onclose.bind(this);

    // Buffer for messages sent while the socket is closed/reconnecting.
    this.sendBuffer = [];
    this.dispatch = dispatch;
  }


  onmessage(e) {
    const payload = JSON.parse(e.data);
    switch(payload.type) {
      case 'room_update':
        const { room, events: eventList } = payload;
        this.dispatch(receiveRoom(room));
        if(eventList && eventList.length > 0) {
          this.dispatch(receiveEvents(room.room_id, eventList));
        }
        break;

      case 'ok':
        break;

      default:
        console.warn("Unhandled RoomSocket message: ", payload);
        break;
    }
  }


  send(message) {
    if(this.rws.readyState == WebSocket.OPEN) {
      this.rws.send(JSON.stringify(message));
    } else {
      this.sendBuffer.push(message);
    }
  }

  onopen(e) {
    console.log("RoomSocket connected", e);
    while(this.sendBuffer.length > 0) {
      this.send(this.sendBuffer.shift());
    }
  }

  onclose(e) {
    console.warn("RoomSocket closed by remote host. Will attempt reconnection");
  }

  onerror(e) {
    console.error("RoomSocket got an error: ", e.error);
  }
}
