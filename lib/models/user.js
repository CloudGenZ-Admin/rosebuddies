import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Nullable because Firebase users won't have a local password
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Nullable because local email/password users won't have a Firebase UID
    firebaseUid: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);
