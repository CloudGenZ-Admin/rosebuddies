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
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true, // For public ticketed experiences ($35-$100)
    }
  },
  {
    tableName: "events",
    timestamps: true,
  }
);

// Define Associations
Circle.hasMany(Event, { foreignKey: 'circleId', as: 'events' });
Event.belongsTo(Circle, { foreignKey: 'circleId', as: 'circle' });
