const { Router } = require('express');
const { check } = require('express-validator');

const { validFields,
        validJWT,
        isAdminRole,
        haveRole
} = require('../middlewares');

const { getUser,
        postUser,
        putUser,
        deleteUser
} = require('../controllers/user.controller');
const { isValidRole,
        existEmail,
        existUserById
} = require('../helpers/db-validators');

const router = Router();

router.get('/', getUser);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email not valid').isEmail(),
    check('email').custom(existEmail),
    check('password', 'Password is required and 6 or more characters').isLength({ min: 6 }),
    check('role').custom(isValidRole),
    validFields
    /* check('role', 'Role not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']), */
], postUser);

router.put('/:id', [
    check('id', 'ID not is valid').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isValidRole),
    validFields
], putUser);

router.delete('/:id', [
    validJWT,
    isAdminRole,
    haveRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'ID not is valid').isMongoId(),
    check('id').custom(existUserById),
    validFields
], deleteUser);

module.exports = router;