import { EventKind, Command, Event } from '../CQRS/CQRS';

export const commandToEvent: Record<string, EventKind> = {
    CreateItem: 'ItemCreated',
    UpdateItem: 'ItemUpdated',
    GetById: 'ItemFetched'
}

// Pure function to decide when command is promoted to event on business decision based
export const decide = (command: Command): Event => {
  return { kind: commandToEvent[command.kind], payload: command.payload }
}