const { Router } = require('express');
const { check } = require('express-validator');

const { getProduct,
        postProduct,
        getProducts,
        putProduct,
        deleteProduct
} = require('../controllers/product.controller');
const { existProductById, existCategoryById } = require('../helpers/db-validators');
const { validJWT, validFields, isAdminRole, haveRole } = require('../middlewares');

const router = Router();

router.get('/', getProducts);

router.get('/:id',[
    validJWT,
    check('id', 'ID not is valid').isMongoId(),
    check('id').custom(existProductById),
    validFields
], getProduct);

router.post('/', [
    validJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required. ID not is valid').isMongoId(),
    check('category').custom(existCategoryById),
    validFields
], postProduct);

router.put('/:id', [
    validJWT,
    check('id', 'ID not is valid').isMongoId(),
    check('id').custom(existProductById),
    validFields
], putProduct);

router.delete('/:id', [
    validJWT,
    isAdminRole,
    haveRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'ID not is valid').isMongoId(),
    check('id').custom(existProductById),
    validFields
], deleteProduct);

module.exports = router;