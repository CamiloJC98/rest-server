const { response, request } = require('express');
const { Product } = require('../models');

const getProducts = async (req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        products
    });
};

const getProduct = async (req = request, res = response) => {
    const { id } = req.params;

    const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name');

    res.json(product);
};

const putProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, price, category, description, available } = req.body;
    const product = await Product.findById(id);
    
    if (product.name === name.toUpperCase()) {
        return res.status(400).json({
            message: `Error uptade Product ${name} already exist.`
        });
    }

    product.name = name.toUpperCase();
    product.user = req.user._id;
    product.price = price;
    product.category = category;
    product.description = description;
    product.available = available;

    const productDB = await Product.findByIdAndUpdate(id, product);

    res.json(productDB);
};

const postProduct = async (req = request, res = response) => {
    const { price, category, description } = req.body;
    const name = req.body.name.toUpperCase();
    
    const productDB = await Product.findOne({ name });

    if (productDB) {
        return res.status(400).json({
            message: `Cateogry ${ productDB.name }, exist.`
        });
    }

    const data = {
        name,
        price,
        category,
        description,
        user: req.user._id
    };

    const product = new Product(data);
    await product.save();

    res.status(201).json(product);
};

const deleteProduct = async (req = request, res = response) => {

    const { id } = req.params;

    // Physical Delete
    // const Product = await Product.findByIdAndDelete(id);

    // Virtual Delete
    const product = await Product.findByIdAndUpdate(id, { status: false });
    const userAuth = req.user;

    res.json({product, userAuth});
};

module.exports= {
    postProduct,
    getProducts,
    getProduct,
    putProduct,
    deleteProduct
}