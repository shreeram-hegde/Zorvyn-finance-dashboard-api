const authorizeRoles = (...allowedRoles) => {
    
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: Requires one of roles: ${allowedRoles.join(', ')}`
            });
        }
        next();
    };
};

module.exports = { authorizeRoles };