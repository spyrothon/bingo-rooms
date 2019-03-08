import { MarkCellCommand } from './chat-commands/mark-cell';
import { UnmarkCellCommand } from './chat-commands/unmark-cell';
import { AddTeamCommand } from './chat-commands/add-team';

export const Commands = {
  markcell: MarkCellCommand,
  unmarkcell: UnmarkCellCommand,
  addteam: AddTeamCommand
}

