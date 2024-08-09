import { SaleOrderItem } from '../models/saleOrderItem'
import { Event } from '../CQRS/CQRS'

// Función pura: Encapsula la lógica de negocio
const processEvent = (event: Event) => {
  const operations = {
    ItemCreated: { status: 201, operation: 'create' },
    ItemUpdated: { status: 200, operation: 'update' },
    ItemFetched: { status: 200, operation: 'fetch' },
    ItemDeleted: { status: 200, operation: 'delete' },
  }

  return operations[event.kind] ? { ...operations[event.kind], event } : { status: 500, operation: 'unknown' };
}

// Shell imperativa: Maneja los efectos secundarios basados en la lógica pura
export const notifyEvent = async (event: Event) => {
  const { status, operation } = processEvent(event)

  const operations: Record<string, () => Promise<any>> = {
    create: async () => ({ status, data: await SaleOrderItem.create(event.payload) }),
    update: async () => {
      const item = await SaleOrderItem.findByPk(event.payload.id);
      return item ? { status, data: await item.update(event.payload) } : { status: 404, message: 'Item not found' };
    },
    fetch: async () => {
      const item = await SaleOrderItem.findByPk(event.payload.id);
      return item ? { status, data: item } : { status: 404, message: 'Item not found' };
    },
    delete: async () => {
      const item = await SaleOrderItem.findByPk(event.payload.id);
      return item ? { status, data: await item.destroy() } : { status: 404, message: 'Item not found' };
    },
  };

  return operations[operation] ? await operations[operation]() : { status: 500, message: 'Unknown operation' };
}