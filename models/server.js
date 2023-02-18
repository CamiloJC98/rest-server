const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
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