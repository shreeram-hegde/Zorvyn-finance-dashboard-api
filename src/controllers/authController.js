const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const newUser = await authService.registerUser(username, password, role);
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await authService.loginUser(username, password);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};



const updateRecord = (req, res) => {
    try {
        const validatedData = recordSchema.parse(req.body); // Re-use our Zod schema!
        const updatedRecord = recordService.updateRecord(req.params.id, validatedData);
        res.status(200).json({ success: true, data: updatedRecord });
    } catch (error) {
        // Handle Zod validation errors cleanly
        const message = error.errors ? error.errors : error.message;
        const statusCode = error.message === 'Record not found' ? 404 : 400;
        res.status(statusCode).json({ success: false, message });
    }
};

module.exports = { register, login };