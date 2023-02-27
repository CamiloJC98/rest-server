const { Router } = require('express');
const { check } = require('express-validator');

const { validFields, validJWT, validFiles } = require('../middlewares');
const { collectionAllowed } = require('../helpers/db-validators');

const { uploadFiles, updateImage, getImages, updateImageCloudinary } = require('../controllers/uploads.controller');


const router = Router();

router.get('/:collection/:id', [
    check('id', 'ID not is valid').isMongoId(),
    check('collection').custom(c => collectionAllowed(c, ['users', 'products'])),
    validFields
], getImages);

router.post('/', validFiles, uploadFiles);

router.put('/:collection/:id', [
    validFiles,
    check('id', 'ID not is valid').isMongoId(),
    check('collection').custom(c => collectionAllowed(c, ['users', 'products'])),
    validFields
], updateImageCloudinary);

module.exports = router;