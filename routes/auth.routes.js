const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares');
const { login } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', [
    check('email', 'Email not valid').isEmail(),
    check('password', 'Password not valid').not().isEmpty(),
    validFields
], login);

module.exports = router;