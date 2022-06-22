const boom = require('@hapi/boom');
const { v4: uuidv4 } = require('uuid');
const pool = require('../libs/postgres');

class TablesService {

    constructor () {
        this.pool = pool;
        this.pool.on('error', (err) => console.log(err));
    }

    async create (data, user){
        const idOperation = uuidv4();
        const {concept, ammount, date, type, category } = data;
        const query = `INSERT INTO public.operations (_iduser ,_idoperation, _concept, _ammount, _date, _type, _category) VALUES ('${user}' ,'${idOperation}','${concept}', ${ammount}, '${date}', '${type}', '${category}') returning *;`
        const response = await this.pool.query(query);

        return response.rows;
    }

    async find(user) {
        const query = `SELECT * FROM public.operations WHERE _iduser = '${user}' ORDER BY _id DESC`;
        const response = await this.pool.query(query);

        return response.rows;
    }

    async findOne (id, user) {
        const query = (`SELECT * FROM public.operations WHERE _idoperation = '${id}' AND _iduser = '${user}'`);
        console.log(query)
        const response = await this.pool.query(query);

        if(response.rowCount === 0) {
            throw boom.notFound();
        }

        return response.rows;
    }

    async update (id, change) {
        const {concept, ammount, date, type, category } = change;
        const query = `UPDATE operations SET _concept = '${concept}', _ammount = ${ammount}, _date = '${date}', _type = '${type}', _category = '${category}' WHERE _idoperation = '${id}' returning *`;
        const response = await this.pool.query(query);

        if(response.rowCount === 0){
            throw boom.notFound();
        }

        return response.rows;
    }

    async delete (id) {
        const query = `DELETE FROM public.operations WHERE _idoperation = '${id}' returning *`;
        const response = await this.pool.query(query);

        if(response.rowCount === 0){
            throw boom.notFound();
        }

        return response.rows;
    }
}

module.exports = TablesService;