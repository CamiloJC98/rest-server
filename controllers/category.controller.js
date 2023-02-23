const { response, request } = require('express');
const { Category } = require('../models');


const getCategories = async (req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        categories
    });
};

const getCategory = async (req = request, res = response) => {
    const { id } = req.params;

    const category = await Category.findById(id)
        .populate('user', 'name');

    res.json(category);
};

const putCategory = async (req = request, res = response) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findById(id);
    
    if (category.name === name.toUpperCase()) {
        return res.status(400).json({
            message: `Error uptade Category ${name} already exist.`
        });
    }

    category.name = name.toUpperCase();
    category.user = req.user._id;
    const categoryDB = await Category.findByIdAndUpdate(id, category);

    res.json(categoryDB);
};

const postCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();
    
    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
        return res.status(400).json({
            message: `Cateogry ${ categoryDB.name }, exist.`
        });
    }

    const data = {
        name,
        user: req.user._id
    };

    const category = new Category(data);
    await category.save();

    res.status(201).json(category);
};

const deleteCategory = async (req = request, res = response) => {

    const { id } = req.params;

    // Physical Delete
    // const category = await Category.findByIdAndDelete(id);

    // Virtual Delete
    const category = await Category.findByIdAndUpdate(id, { status: false });
    const userAuth = req.user;

    res.json({category, userAuth});
};

module.exports= {
    postCategory,
    getCategories,
    getCategory,
    putCategory,
    deleteCategory
}