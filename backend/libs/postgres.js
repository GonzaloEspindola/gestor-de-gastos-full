const { Pool } = require('pg');
const { config } = require('../config/config');

const options = {};

if (config.isProd) {
    options.connectionString = config.dbUrl;
    options.ssl = {
        rejectUnauthorized: false
    };
    
}else {
    //obteniendo variables de ambiente declaradas en el archivo env
    const USER = encodeURIComponent(config.dbUser);
    const PASSWORD = encodeURIComponent(config.dbPassword);
    const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
    options.connectionString = URI;
}
 
//creando la pool de conexiones
const pool = new Pool(options);

module.exports = pool;