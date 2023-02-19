const { response, request } = require("express");
const bcrypt = require('bcrypt');

const User = require('../models/user');
const { generateJWT } = require("../helpers/generate-jwt");


const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {

        // Valid user email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Email or Password is incorrect'
            });
        }

        if (!user.status) {
            return res.status(400).json({
                message: 'User no register'
            });
        }

        // Valid password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: 'Password is incorrect'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            token,
            user
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({            
            message: 'Server Error'
        });
    }

};

module.exports = {
    login
}