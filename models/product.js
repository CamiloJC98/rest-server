const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'Status is required']
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'User is required']
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        required: [true, 'Category is required']
    },
    description: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    },
});

ProductSchema.methods.toJSON = function() {
    const { __v, _id, ...product } = this.toObject();
    product.uid = _id;
    return product;
}

module.exports = model('Products', ProductSchema);