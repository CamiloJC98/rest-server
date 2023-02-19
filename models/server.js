const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usersPath = '/api/users';

        // Database
        this.connectionDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async connectionDB() {
        await dbConnection();
    }

    middlewares() {

        // Directorio público
        this.app.use(express.static('public'));

        // CORS
        this.app.use(cors());

        // Read/Write body
        this.app.use(express.json());

    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listening on Port:', this.port);
        });
    }
}

module.exports = Server;