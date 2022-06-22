const { v4: uuidv4 } = require('uuid');
const pool = require('../libs/postgres');
const boom = require('@hapi/boom');

class UsersService {

    constructor () {
        this.pool = pool;
        this.pool.on('error', (err) => console.log(err));
    }

    async create (data){
        const {email, password } = data;
        const query = `INSERT INTO public.users (_email, _password) VALUES ('${email}', '${password}');`
        const response = await this.pool.query(query);

        return response.rows;
    }

    async find() {
        const query = 'SELECT * FROM users';
        const response = await this.pool.query(query);
        return response.rows;
    }

    async findByEmail(data) {
        const query = `SELECT * FROM users WHERE _email = '${data}'`;
        const response = await this.pool.query(query);

        return response.rows[0];
    } 

}

module.exports = UsersService;