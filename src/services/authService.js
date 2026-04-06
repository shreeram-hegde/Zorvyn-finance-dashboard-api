const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const registerUser = async (username, password, role = 'Viewer') => {
    const passwordHash = await bcrypt.hash(password, 10);
    try {
        const stmt = db.prepare('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)');
        const info = stmt.run(username, passwordHash, role);
        return { id: info.lastInsertRowid, username, role };
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) throw new Error('Username already exists');
        throw error;
    }
};

const loginUser = async (username, password) => {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { token, user: { id: user.id, username: user.username, role: user.role } };
};

module.exports = { registerUser, loginUser };