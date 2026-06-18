import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const JoinRequest = sequelize.define(
  "JoinRequest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "join_requests",
    timestamps: true,
  }
);
