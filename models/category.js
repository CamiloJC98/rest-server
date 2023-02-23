const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
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
    }
});

CategorySchema.methods.toJSON = function() {
    const { __v, _id, ...category } = this.toObject();
    category.uid = _id;
    return category;
}

module.exports = model('Categories', CategorySchema);