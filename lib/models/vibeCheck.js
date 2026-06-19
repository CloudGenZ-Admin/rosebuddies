import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const VibeCheck = sequelize.define(
  "VibeCheck",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    answers: { type: DataTypes.JSON, allowNull: false },
  },
  { tableName: "vibe_checks", timestamps: true }
);
