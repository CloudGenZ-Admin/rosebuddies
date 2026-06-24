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
      allowNull: true, // Admin marks this after the event occurs
    },
    noShowFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Flag repeated no-shows
      allowNull: false,
    }
  },
  {
    tableName: "event_attendance",
    timestamps: true,
  }
);

// Define Associations
// Define Associations
Event.belongsToMany(User, { through: EventAttendance, foreignKey: 'eventId', as: 'attendees' });
User.belongsToMany(Event, { through: EventAttendance, foreignKey: 'userId', as: 'events' });
Event.hasMany(EventAttendance, { foreignKey: 'eventId', as: 'attendances' });
EventAttendance.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });
User.hasMany(EventAttendance, { foreignKey: 'userId', as: 'attendances' });
EventAttendance.belongsTo(User, { foreignKey: 'userId', as: 'user' });
