const { response, request } = require('express');

const getUser = (req = request, res = response) => {

    const { apiKey } = req.query;

    res.json({
        msg: 'GET API',
        apiKey
    });
};

const postUser = (req = request, res = response) => {
    const { nombre, edad } = req.body;

    res.json({
        msg: 'POST API',
        nombre,
        edad
    });
};

const putUser = (req = request, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'PUT API',
        id
    });
};

const deleteUser = (req = request, res = response) => {
    res.json({
        msg: 'DELETE API'
    });
};

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser
};