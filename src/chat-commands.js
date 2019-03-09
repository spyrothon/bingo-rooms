import { MarkCellCommand } from './chat-commands/mark-cell';
import { UnmarkCellCommand } from './chat-commands/unmark-cell';
import { AddTeamCommand } from './chat-commands/add-team';
import { RemoveTeamCommand } from './chat-commands/remove-team';
import { JoinTeamCommand } from './chat-commands/join-team';

export const Commands = {
  markcell: MarkCellCommand,
  unmarkcell: UnmarkCellCommand,
  addteam: AddTeamCommand,
  removeteam: RemoveTeamCommand,
  join: JoinTeamCommand
}

