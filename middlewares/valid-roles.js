const { response, request } = require("express");


const isAdminRole = (req = request, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            message: 'Verify role failed. Token not verify.'
        });
    }

    const { role, name } = req.user;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            message: `${name} not role Admin.`
        });
    }

    next();
};

const haveRole = ( ...roles ) => {
    return (req = request, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                message: 'Verify role failed. Token not verify.'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                message: `Service required any roles: ${roles}`
            });
        }

        next();
    };
};

module.exports = {
    isAdminRole,
    haveRole
}