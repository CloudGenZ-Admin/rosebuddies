import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./user.js";
import { Circle } from "./circle.js";

export const CircleMember = sequelize.define(
  "CircleMember",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    circleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Circle,
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
    status: {
      type: DataTypes.ENUM("active", "paused", "left", "interested"),
      defaultValue: "interested",
      allowNull: false,
    },
    exitReason: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: "circle_members",
    timestamps: true,
  }
);

