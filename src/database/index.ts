import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("sales_order_db", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

