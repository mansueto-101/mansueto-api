import { client } from "./database.js";

async function createUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_login TEXT NOT NULL DEFAULT '',
      user_pass TEXT NOT NULL DEFAULT '',
      fname TEXT NOT NULL,
      lname TEXT NOT NULL,
      gender TEXT NOT NULL,
      user_level INTEGER NOT NULL DEFAULT 0,
      branch_cd TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL DEFAULT '',
      registered DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      user_activation_key TEXT NOT NULL DEFAULT '',
      isActive INTEGER NOT NULL DEFAULT 1
    );
  `;

  try {
    await client.execute(createTableQuery);
    console.log("Success: 'users' table has been created in Turso!");
  } catch (error) {
    console.error("Failed to create table:", error);
  }
}

createUsersTable();