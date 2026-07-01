import { Admin } from "./admin.js";
import { Circle } from "./circle.js";
import { CircleMember } from "./circleMember.js";
import { Event } from "./event.js";
import { EventAttendance } from "./eventAttendance.js";
import { FooterSubscriber } from "./footerSubscriber.js";
import { GetStartedMeet } from "./getStartedMeet.js";
import { JoinRequest } from "./joinRequest.js";
import { MeetPerson } from "./meetPerson.js";
import { User } from "./user.js";
import { UserPreference } from "./userPreference.js";
import { UserProfile } from "./userProfile.js";
import { VibeCheck } from "./vibeCheck.js";


// User <-> UserProfile (1:1)
User.hasOne(UserProfile, { foreignKey: 'userId', as: 'profile' });
UserProfile.belongsTo(User, { foreignKey: 'userId' });

// User <-> UserPreference (1:1)
User.hasOne(UserPreference, { foreignKey: 'userId', as: 'preferences' });
UserPreference.belongsTo(User, { foreignKey: 'userId' });

// Circle <-> User (M:N through CircleMember)
Circle.belongsToMany(User, { through: CircleMember, foreignKey: 'circleId', as: 'members' });
User.belongsToMany(Circle, { through: CircleMember, foreignKey: 'userId', as: 'circles' });
CircleMember.belongsTo(Circle, { as: 'circle', foreignKey: 'circleId' });
CircleMember.belongsTo(User, { as: 'user', foreignKey: 'userId' });

// Circle <-> Event (1:M)
Circle.hasMany(Event, { foreignKey: 'circleId', as: 'events' });
Event.belongsTo(Circle, { foreignKey: 'circleId', as: 'circle' });

// Event <-> User (M:N through EventAttendance)
Event.belongsToMany(User, { through: EventAttendance, foreignKey: 'eventId', as: 'attendees' });
User.belongsToMany(Event, { through: EventAttendance, foreignKey: 'userId', as: 'events' });
Event.hasMany(EventAttendance, { foreignKey: 'eventId', as: 'attendances' });
EventAttendance.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });
User.hasMany(EventAttendance, { foreignKey: 'userId', as: 'attendances' });
EventAttendance.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// ----------------------------------------------------------------------------
// EXPORT ALL MODELS
// ----------------------------------------------------------------------------

export {
  Admin,
  Circle,
  CircleMember,
  Event,
  EventAttendance,
  FooterSubscriber,
  GetStartedMeet,
  JoinRequest,
  MeetPerson,
  User,
  UserPreference,
  UserProfile,
  VibeCheck
};
