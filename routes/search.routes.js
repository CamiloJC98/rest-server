const { Router } = require('express');
const { check } = require('express-validator');

const { getSearch } = require('../controllers/search.controller');

const router = Router();

router.get('/:collection/:to', getSearch);

module.exports = router;