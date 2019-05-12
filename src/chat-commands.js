import { MarkCellCommand } from './chat-commands/mark-cell';
import { UnmarkCellCommand } from './chat-commands/unmark-cell';
import { JoinRoomCommand } from './chat-commands/join-room';
// import { LeaveRoomCommand } from './chat-commands/leave-room';
import { SetNicknameCommand } from './chat-commands/set-nickname';
import { SetColorCommand } from './chat-commands/set-color';
import { GenerateBoardCommand } from './chat-commands/generate-board';

export const Commands = {
  mark:   MarkCellCommand,
  unmark: UnmarkCellCommand,
  join:   JoinRoomCommand,
  // leave:  LeaveRoomCommand,
  nick:   SetNicknameCommand,
  color:  SetColorCommand,
  generate: GenerateBoardCommand,
}
