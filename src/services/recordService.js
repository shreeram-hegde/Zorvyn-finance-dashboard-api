// src/services/recordService.js
const db = require('../config/db');

const createRecord = (data, userId) => {
    const stmt = db.prepare(`
        INSERT INTO records (amount, type, category, date, notes, created_by) 
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(data.amount, data.type, data.category, data.date, data.notes, userId);
    return { id: info.lastInsertRowid, ...data };
};

// Added basic filtering for type and category. 
// For dates, I'm using BETWEEN so the frontend can easily send range-based filters.
const getAllRecords = (filters = {}) => {
    let query = 'SELECT * FROM records WHERE 1=1';
    const params = [];

    if (filters.type) {
        query += ' AND type = ?';
        params.push(filters.type);
    }
    if (filters.category) {
        query += ' AND category = ?';
        params.push(filters.category);
    }
    if (filters.startDate && filters.endDate) {
        query += ' AND date BETWEEN ? AND ?';
        params.push(filters.startDate, filters.endDate);
    }
    
    query += ' ORDER BY date DESC';
    return db.prepare(query).all(...params);
};


const updateRecord = (id, data) => {
    const stmt = db.prepare(`
        UPDATE records 
        SET amount = ?, type = ?, category = ?, date = ?, notes = ? 
        WHERE id = ?
    `);
    const result = stmt.run(data.amount, data.type, data.category, data.date, data.notes, id);
    
    if (result.changes === 0) throw new Error('Record not found');
    return { id, ...data };
};

const deleteRecord = (id) => {
    const stmt = db.prepare('DELETE FROM records WHERE id = ?');
    const result = stmt.run(id);
    if (result.changes === 0) throw new Error('Record not found');
    return true;
};


module.exports = { createRecord, getAllRecords, updateRecord, deleteRecord };