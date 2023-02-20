const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares');
const { login, googleSignIn } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', [
    check('email', 'Email not valid').isEmail(),
    check('password', 'Password not valid').not().isEmpty(),
    validFields
], login);

router.post('/google', [
    check('id_token', 'Token is required').not().isEmpty(),
    validFields
], googleSignIn);

module.exports = router;