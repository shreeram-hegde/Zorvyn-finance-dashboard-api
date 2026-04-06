// src/controllers/recordController.js
const recordService = require('../services/recordService');
const { recordSchema } = require('../utils/validators');

const createRecord = (req, res) => {
    try {
        const validatedData = recordSchema.parse(req.body);
        const newRecord = recordService.createRecord(validatedData, req.user.id);
        res.status(201).json({ success: true, data: newRecord });
    } catch (error) {
        res.status(400).json({ success: false, message: error.errors || error.message });
    }
};

const getAllRecords = (req, res) => {
    try {
        const records = recordService.getAllRecords(req.query);
        res.status(200).json({ success: true, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateRecord = (req, res) => {
    try {
        const validatedData = recordSchema.parse(req.body); 
        const updatedRecord = recordService.updateRecord(req.params.id, validatedData);
        res.status(200).json({ success: true, data: updatedRecord });
    } catch (error) {
        const message = error.errors ? error.errors : error.message;
        const statusCode = error.message === 'Record not found' ? 404 : 400;
        res.status(statusCode).json({ success: false, message });
    }
};

const deleteRecord = (req, res) => {
    try {
        recordService.deleteRecord(req.params.id);
        res.status(200).json({ success: true, message: 'Record deleted' });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};


module.exports = { createRecord, getAllRecords, updateRecord, deleteRecord };