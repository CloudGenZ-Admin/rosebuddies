import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const FooterSubscriber = sequelize.define(
  "FooterSubscriber",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "footer_subscribers", timestamps: true }
);
