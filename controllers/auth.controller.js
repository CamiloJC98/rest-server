const { response, request } = require("express");
const bcrypt = require('bcrypt');

const User = require('../models/user');
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");


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

const googleSignIn = async (req, res) => {

    const { id_token } = req.body;

    try {
        const { name, image, email } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) {
            const data = {
                name,
                email,
                password: '',
                image,
                google: true
            };

            user = new User(data);
            await user.save();
        }

        if (!user.status) {
            return  res.status(401).json({
                message: 'Verify with ADMIN, user is blocked.'
            });
        }

        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
    } catch(err) {
        console.log(err);
        res.status(400).json({
            message: 'Token not verify.'
        });
    }

};

module.exports = {
    login,
    googleSignIn
}