import { decide } from '../src/business/Decide'
import { CommandError, CommandKind } from '../src/CQRS/CQRS'
import * as fc from 'fast-check'

describe('Decide Property-Based Tests', () => {
  it('should return a valid event for any command', () => {
    fc.assert(
      fc.property(
        fc.record({
          kind: fc.constantFrom<CommandKind | CommandError>('CreateItem', 'UpdateItem', 'GetById', 'DeleteItem', 'InvalidCommand', 'UnsupportedCommand'),
          payload: fc.anything(),
        }),
        (command) => {
          const event = decide(command);
          expect(event).toHaveProperty('kind');
          expect(event).toHaveProperty('payload');
        }
      )
    )
  })
})