const validFields = require('./valid-fields');
const validJWT = require('./valid-jwt');
const validRoles = require('./valid-roles');
const validFiles = require('./valid-files');

module.exports = {
    ...validFields,
    ...validJWT,
    ...validRoles,
    ...validFiles
}