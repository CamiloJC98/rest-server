const { Category, Role, User, Product } = require('../models');

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


const existCategoryById = async (id = '') => {
    const existCategory = await Category.findById(id);
    if (!existCategory) {
        throw new Error(`Cateogry ${id} not exist'`);
    }
};

const existProductById = async (id = '') => {
    const existProduct = await Product.findById(id);
    if (!existProduct) {
        throw new Error(`Cateogry ${id} not exist'`);
    }
};

module.exports = {
    isValidRole,
    existEmail,
    existUserById,
    existCategoryById,
    existProductById
}