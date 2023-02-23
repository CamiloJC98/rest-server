const { response, request } = require('express');
const { isValidObjectId } = require('mongoose');

const { User, Product, Category } = require('../models');

const collectionAccess = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUser = async (to = '', res = response) => {
    const isMongoID = isValidObjectId(to);

    if (isMongoID) {
        const user = await User.findById(to);
        return res.json({
            results: user ? [ user ] : []
        });
    }

    const regex = new RegExp(to, 'i');

    const users = await User.find({
        $or: [
            { name: regex },
            { email: regex },
        ],
        $and: [{ status: true }]
    });
    res.json({
        results: users
    });
};

const searchProducts = async (to = '', res = response) => {
    const isMongoID = isValidObjectId(to);

    if (isMongoID) {
        const product = await Product.findById(to);
        return res.json({
            results: product ? [ product ] : []
        });
    }

    const regex = new RegExp(to, 'i');

    const products = await Product.find({ name: regex, status: true });
    res.json({
        results: products
    });
};

const searchCategories = async (to = '', res = response) => {
    const isMongoID = isValidObjectId(to);

    if (isMongoID) {
        const category = await Category.findById(to);
        return res.json({
            results: category ? [ category ] : []
        });
    }

    const regex = new RegExp(to, 'i');

    const categories = await Category.find({ name: regex, status: true });
    res.json({
        results: categories
    });
};

const getSearch = (req = request, res = response) => {
    const { collection, to } = req.params;

    if (!collectionAccess.includes(collection)) {
        return res.status(400).json({
            message: `Collection ${collection} not access.`
        });
    }

    switch (collection) {
        case 'users':
            searchUser(to, res);
            break
        case 'categories':
            searchCategories(to, res);
            break
            case 'products':
            searchProducts(to, res);
            break
        default:
            res.status(500).json({
                message: 'Not found collection. Advise with Admin.'
            })
            break
    }
};


module.exports = {
    getSearch
}