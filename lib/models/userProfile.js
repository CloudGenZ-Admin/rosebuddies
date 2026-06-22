import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./user.js";

export const UserProfile = sequelize.define(
  "UserProfile",
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
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    socialLink: {
      type: DataTypes.STRING,
      allowNull: true, // e.g. LinkedIn or Instagram
    },
    preferredNeighborhoods: {
      type: DataTypes.JSON, // Array of strings
      allowNull: true,
    },
    friendshipGoals: {
      type: DataTypes.JSON, // Array of strings
      allowNull: true,
    },
    socialEnergy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    availability: {
      type: DataTypes.JSON, // Array of strings
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    tableName: "user_profiles",
    timestamps: true,
  }
);

// Define Association
User.hasOne(UserProfile, { foreignKey: 'userId', as: 'profile' });
UserProfile.belongsTo(User, { foreignKey: 'userId' });
