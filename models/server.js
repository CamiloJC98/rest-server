const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        
        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            category: '/api/category',
            product: '/api/product',
            search: '/api/search',
        };

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
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.users, require('../routes/user.routes'));
        this.app.use(this.paths.category, require('../routes/category.routes'));
        this.app.use(this.paths.product, require('../routes/product.routes'));
        this.app.use(this.paths.search, require('../routes/search.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listening on Port:', this.port);
        });
    }
}

module.exports = Server;