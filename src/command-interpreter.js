import * as Actions from './actions';
import { Commands } from './chat-commands';

export function matchingCommands(leader) {
  const commands = Object.keys(Commands);

  return commands.filter((command) => command.startsWith(leader));
}


export function interpretAndDispatchMessage(dispatch, roomId, message) {
  if(message[0] != '/') {
    dispatch(Actions.sendChatMessage(roomId, message));
    return "ok";
  }

  const {command, args} = parseCommand(message);

  try {
    if(Commands.hasOwnProperty(command)) {
      const inst = new Commands[command](roomId, dispatch);
      inst.call(args);
    }
  } catch(error) {
    console.info("Could not apply command", error);
  }
}


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
