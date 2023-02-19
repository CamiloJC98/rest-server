const validFields = require('./valid-fields');
const validJWT = require('./valid-jwt');
const validRoles = require('./valid-roles');

module.exports = {
    ...validFields,
    ...validJWT,
    ...validRoles
}