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
      type: DataTypes.ENUM("active", "paused", "left"),
      defaultValue: "active",
      allowNull: false,
    },
    exitReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    tableName: "circle_members",
    timestamps: true,
  }
);

// Define Associations
Circle.belongsToMany(User, { through: CircleMember, foreignKey: 'circleId', as: 'members' });
User.belongsToMany(Circle, { through: CircleMember, foreignKey: 'userId', as: 'circles' });
