const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validJWT = async ( req = request, res = response, next ) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            message: 'Access Denied - Token not found.'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                message: 'Access Denied - User not exist.'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                message: 'Access Denied - User not active.'
            });
        }

        req.user = user;
        
        next();
    } catch(err) {
        console.log(err);
        return res.status(401).json({
            message: 'Access Denied - Token not valid.'
        });
    }
};

module.exports = {
    validJWT
}