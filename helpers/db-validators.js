const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`Role ${role} is not valid`);
    }
};

const existEmail = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`Email ${email} already in use'`);
    }
};

const existUserById = async (id = '') => {
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`ID ${id} not exist'`);
    }
};

module.exports = {
    isValidRole,
    existEmail,
    existUserById
}