import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const GetStartedMeet = sequelize.define(
  "GetStartedMeet",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    vibe: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "get_started_meets", timestamps: true }
);
