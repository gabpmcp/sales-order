import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

class SaleOrderItem extends Model {
  public id!: number;
  public name!: string;
  public quantity!: number;
  public price!: number;
}

SaleOrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "saleOrderItems",
  }
);

export { SaleOrderItem };

