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
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profileCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    adminNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stripeSubscriptionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentStatus: {
      type: DataTypes.ENUM("active", "past_due", "canceled"),
      defaultValue: "active",
      allowNull: false,
    },
    accountStatus: {
      type: DataTypes.ENUM("active", "suspended"),
      defaultValue: "active",
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);
