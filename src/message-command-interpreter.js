import * as Actions from './actions';

/* Command Grammar
 *    /command[/arg]*
 *
 * Examples:
 *    /addTeam/Team1/red
 *    /setTeamColor/Team2/blue
 */
function parseCommand(message) {
  const [rawCommand, ...args] = message.slice(1).split('/');
  const command = rawCommand;
  return {command, args};
}

const COMMANDS = {
  markcell: (roomId, dispatch, cellIndex, team) => {
    if(cellIndex && team) {
      return dispatch(Actions.markCell(roomId, parseInt(cellIndex), team));
    }
  },
  unmarkcell: (roomId, dispatch, cellIndex, team) => {
    if(cellIndex && team) {
      return dispatch(Actions.unmarkCell(roomId, parseInt(cellIndex), team));
    }
  },
  addteam: (roomId, dispatch, name, color) => {
    if(name) {
      return dispatch(Actions.addTeam(roomId, name, color || 'white'));
    }
  }
}


export function interpretAndDispatchMessage(dispatch, roomId, message) {
  if(message[0] != '/') {
    dispatch(Actions.sendChatMessage(roomId, message));
    return "ok";
  }

  const {command, args} = parseCommand(message);

  try {
    if(COMMANDS.hasOwnProperty(command)) {
      COMMANDS[command].apply(null, [roomId, dispatch, ...args]);
    }
  } catch(error) {
    console.info("Could not apply command", error);
  }
}
