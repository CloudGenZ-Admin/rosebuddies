import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./user.js";

export const UserPreference = sequelize.define(
  "UserPreference",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    quizAnswers: {
      type: DataTypes.JSON, // Stores the dynamic array of questions and answers
      allowNull: true,
      defaultValue: []
    }
  },
  {
    tableName: "user_preferences",
    timestamps: true,
  }
);

// Define Association
User.hasOne(UserPreference, { foreignKey: 'userId', as: 'preferences' });
UserPreference.belongsTo(User, { foreignKey: 'userId' });
