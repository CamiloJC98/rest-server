const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { request, response } = require("express");

const { uploadFile } = require('../helpers/upload-file');
const { User, Product } = require("../models");

const uploadFiles = async (req = request, res = response) => {
    try {
        // const path= await uploadFile(req.files, ['txt', 'md'], 'texts');
        const path = await uploadFile(req.files, undefined, 'imgs');

        res.json({
            name: path
        });
    } catch (err) {
        res.json({
            message: err
        })
    }

};

const updateImage = async (req = request, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({ message: `User not exist with ID: ${id}` });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({ message: `Product not exist with ID: ${id}` });
            }
            break;
        default:
            return res.status(500).json({ message: `Not valid for me.` });
    }

    // Delete images
    if (model.image) {
        const pathImage = path.join(__dirname, '../uploads', collection, model.image);
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    }

    const pathName = await uploadFile(req.files, undefined, collection);
    model.image = pathName;
    await model.save();

    res.json({
        model
    });
};

const getImages = async (req = request, res = response) => {
    const { id, collection } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({ message: `User not exist with ID: ${id}` });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({ message: `Product not exist with ID: ${id}` });
            }
            break;
        default:
            return res.status(500).json({ message: `Not valid for me.` });
    }

    // Delete images
    if (model.image) {
        const pathImage = path.join(__dirname, '../uploads', collection, model.image);
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        }
    }

    const pathNoImage = path.join(__dirname, '../assets', 'no-image.jpg');
    res.sendFile(pathNoImage);
};

const updateImageCloudinary = async (req = request, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({ message: `User not exist with ID: ${id}` });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({ message: `Product not exist with ID: ${id}` });
            }
            break;
        default:
            return res.status(500).json({ message: `Not valid for me.` });
    }

    // Delete images
    if (model.image) {
        const nameArr = model.image.split('/');
        const name = nameArr[nameArr.length - 1];
        const [ public_id ] = name.split('.');

        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.image = secure_url;
    await model.save();

    res.json({
        model
    });
};

module.exports = {
    uploadFiles,
    updateImage,
    getImages,
    updateImageCloudinary
}