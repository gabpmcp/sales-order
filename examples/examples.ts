import { Op } from 'sequelize';
import { SaleOrderItem } from '../models/saleOrderItem';

// Example query to fetch items based on a condition
const fetchSaleOrderItems = async (minQuantity: number) => {
  return await SaleOrderItem.findAll({
    where: {
      quantity: {
        [Op.gte]: minQuantity,
      },
    },
  })
}