import { createItem } from '../commands/Commands';
import * as fc from 'fast-check';

describe('Property-Based Tests for createItem', () => {
  it('should always create valid items', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 30 }),
        fc.float({ min: 0.01 }),
        fc.integer({ min: 1 }),
        (name, price, quantity) => {
          const command = createItem('some-id', name, price, quantity);
          if (command.kind === 'InvalidCommand') {
            expect(command.payload.errors).toHaveLength(0); // Should not have errors
          } else {
            expect(command.kind).toBe('CreateItem');
          }
        }
      )
    )
  })
})