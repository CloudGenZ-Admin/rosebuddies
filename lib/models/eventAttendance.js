import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./user.js";
import { Event } from "./event.js";

export const EventAttendance = sequelize.define(
  "EventAttendance",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Event,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    rsvpStatus: {
      type: DataTypes.ENUM("going", "not_going", "maybe"),
      defaultValue: "going",
      allowNull: false,
    },
    didAttend: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM("unpaid", "paid", "refunded"),
      defaultValue: "unpaid",
      allowNull: false,
    },
    stripeSessionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "event_attendance",
    timestamps: true,
  }
);

