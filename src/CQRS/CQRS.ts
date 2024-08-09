import Joi from 'joi';

export type CommandKind = 'CreateItem' | 'UpdateItem' | 'GetById' | 'DeleteItem'
export type EventKind = 'ItemCreated' | 'ItemUpdated' | 'ItemFetched' | 'ItemDeleted'
export type CommandError = 'InvalidCommand' | 'UnsupportedCommand'

export type Command = { kind: CommandKind | CommandError; payload: any }
export type Event = { kind: EventKind; payload: any }

const schemas = {
  CreateItem: Joi.object({ name: Joi.string().required(), price: Joi.number().required() }),
  UpdateItem: Joi.object({ name: Joi.string().required(), price: Joi.number().required() }),
  GetById: Joi.object({ id: Joi.string().required() }),
  DeleteItem: Joi.object({ id: Joi.string().required() }),
}

const validate = (schema: Joi.Schema, data: any) =>
  schema ? (schema.validate(data, { abortEarly: false }).error?.details.map(detail => detail.message) || []) : [];

const createCommand = (kind: CommandKind, payload: any): Command => {
  const errors = validate(schemas[kind], payload);
  return errors.length ? { kind: 'InvalidCommand', payload: { errors } } : { kind, payload };
}

export const commands = {
  createItem: (id: string, name: string, price: number) => createCommand('CreateItem', { id, name, price }),
  updateItem: (id: string, name: string, price: number) => createCommand('UpdateItem', { id, name, price }),
  getById: (id: string) => createCommand('GetById', { id }),
  deleteItem: (id: string) => createCommand('DeleteItem', { id }),
}