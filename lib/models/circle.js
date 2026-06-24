import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Circle = sequelize.define(
  "Circle",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING, // e.g., "Food", "Movies", "Outdoors"
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("forming", "active", "completed", "archived"),
      defaultValue: "forming",
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: "circles",
    timestamps: true,
  }
);
