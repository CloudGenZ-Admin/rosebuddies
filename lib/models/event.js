import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Circle } from "./circle.js";

export const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    circleId: {
      type: DataTypes.UUID,
      allowNull: true, // If null, it's a public city-wide event. If set, it's a private circle event.
      references: {
        model: Circle,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    eventImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional cap on attendees
    },
    price: {
      type: DataTypes.INTEGER, // Stored in cents (e.g. 3500 for $35.00)
      allowNull: true,
      defaultValue: 0,
    }
  },
  {
    tableName: "events",
    timestamps: true,
  }
);

