const Database = require('better-sqlite3');
const path = require('path');


const dbPath = path.resolve(__dirname, '../../../finance.db');
const db = new Database(dbPath);

// Initialize tables if they don't exist
const initDb = () => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT CHECK(role IN ('Viewer', 'Analyst', 'Admin')) DEFAULT 'Viewer',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            type TEXT CHECK(type IN ('Income', 'Expense')) NOT NULL,
            category TEXT NOT NULL,
            date DATE NOT NULL,
            notes TEXT,
            created_by INTEGER NOT NULL,
            FOREIGN KEY(created_by) REFERENCES users(id) ON DELETE CASCADE
        );
    `);
};

initDb();

module.exports = db;