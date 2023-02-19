require('dotenv').config();
const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Conectado a la DB');
    } catch(err) {
        console.log(err);
        throw new Error('Error al iniciar la conexión a BD');
    }

};

module.exports = {
    dbConnection
};