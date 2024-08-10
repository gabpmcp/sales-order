import { Request, Response } from "express"
import { notifyEvent } from '../shell/shell'
import { commands } from '../CQRS/CQRS'
import { decide } from '../business/Decide'

export const buildCommand = (req: Request) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;
  return {
    POST: () => commands.createItem(id || '', name, parseFloat(price), parseInt(quantity)),
    PUT: () => commands.updateItem(id || '', name, parseFloat(price)),
    GET: () => commands.getById(id || ''),
    DELETE: () => commands.deleteItem(id || ''),
  }[req.method as 'POST' | 'PUT' | 'GET' | 'DELETE']?.() || { kind: 'UnsupportedCommand', payload: {} }
}

export const handleRequest = async (req: Request, res: Response) => {
  const command = buildCommand(req)

  const event = decide(command)

  const response = await notifyEvent(event)

  res.status(response.status).json(response.data || { message: response.message })
}

