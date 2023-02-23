const { Router } = require('express');
const { check } = require('express-validator');

const { validFields,
        validJWT,
        isAdminRole,
        haveRole
} = require('../middlewares');
const { postCategory,
        getCategories,
        getCategory,
        putCategory,
        deleteCategory
} = require('../controllers/category.controller');
const { existCategoryById } = require('../helpers/db-validators');

const router = Router();

router.get('/', getCategories);

router.get('/:id',[
    validJWT,
    check('id', 'ID not is valid').isMongoId(),
    check('id').custom(existCategoryById),
    validFields
], getCategory);

router.post('/', [
    validJWT,
    check('name', 'Name is required').not().isEmpty(),
    validFields
], postCategory);

router.put('/:id', [
    validJWT,
    check('id', 'ID not is valid').isMongoId(),
    check('id').custom(existCategoryById),
    check('name', 'Name is required').not().isEmpty(),
    validFields
], putCategory);

router.delete('/:id', [
    validJWT,
    isAdminRole,
    haveRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'ID not is valid').isMongoId(),
    check('id').custom(existCategoryById),
    validFields
], deleteCategory);

module.exports = router;