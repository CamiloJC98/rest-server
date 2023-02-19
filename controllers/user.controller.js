const { response, request } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const getUser = async (req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
};

const postUser = async (req = request, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({
        name,
        email,
        password,
        role
    });

    // Crypto password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    
    await user.save();

    res.json({
        user
    });
};

const putUser = async (req = request, res = response) => {

    const { id } = req.params;
    const { password, google, ...user } = req.body;

    if (password) {
        // Crypto password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);        
    }

    const userDB = await User.findByIdAndUpdate(id, user);

    res.json({
        userDB
    });
};

const deleteUser = async (req = request, res = response) => {

    const { id } = req.params;

    // Physical Delete
    // const user = await User.findByIdAndDelete(id);

    // Virtual Delete
    const user = await User.findByIdAndUpdate(id, { status: false });
    const userAuth = req.user;

    res.json({user, userAuth});
};

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser
};