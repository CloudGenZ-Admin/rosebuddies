import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const MeetPerson = sequelize.define(
  "MeetPerson",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    vibe: { type: DataTypes.STRING, allowNull: false },
    vibeCheckId: { type: DataTypes.INTEGER, allowNull: true },
  },
  { tableName: "meet_people", timestamps: true }
);

