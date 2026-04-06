const dashboardService = require('../services/dashboardService');

const getDashboardSummary = (req, res) => {
    try {
        const summary = dashboardService.getSummary();
        res.status(200).json({ success: true, data: summary });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { getDashboardSummary };