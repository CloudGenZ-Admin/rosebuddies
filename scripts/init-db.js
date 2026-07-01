import "dotenv/config"; // Ensure .env is loaded
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { sequelize } from "../lib/db.js";
import { Admin } from "../lib/models/index.js";
import { JoinRequest } from "../lib/models/index.js";
import { User } from "../lib/models/index.js"; // Import so it syncs
import { UserProfile } from "../lib/models/index.js";
import { MeetPerson } from "../lib/models/index.js";
import { FooterSubscriber } from "../lib/models/index.js";
import { VibeCheck } from "../lib/models/index.js";
import { GetStartedMeet } from "../lib/models/index.js";
import { UserPreference } from "../lib/models/index.js";
import { Circle } from "../lib/models/index.js";
import { CircleMember } from "../lib/models/index.js";
import { Event } from "../lib/models/index.js";
import { EventAttendance } from "../lib/models/index.js";

async function initDB() {
  try {
    const host = process.env.DB_HOST || "127.0.0.1";
    const user = process.env.DB_USER || "root";
    const password = process.env.DB_PASSWORD || "";
    const database = process.env.DB_NAME || "rosebuddies";
    const port = process.env.DB_PORT || 3306;

    

    console.log(`Connecting to MySQL server at ${host}:${port}...`);
    // Create connection without database to create it if it doesn't exist
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });

    console.log(`Ensuring database '${database}' exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();

    console.log("Syncing models with Sequelize...");
    // Sync all defined models to the DB
    await sequelize.sync({ alter: true });

    // Seed default admin
    const adminCount = await Admin.count();
    if (adminCount === 0) {
      console.log("No admin found. Creating default admin user (admin / password123)...");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("password123", salt);

      await Admin.create({
        username: "admin",
        passwordHash: hashedPassword,
      });
      console.log("Default admin created successfully.");
    } else {
      console.log("Admin user already exists. Skipping seed.");
    }

    console.log("Database initialization complete.");
    process.exit(0);
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

initDB();
