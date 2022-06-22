const Joi = require('joi');

const idoperation = Joi.string().uuid()
const concept = Joi.string()
const ammount = Joi.number().integer().strict()
const date = Joi.string()
const type = Joi.string()
const category = Joi.string()
// const idUser

const createOperationSchema = Joi.object({
    concept: concept.required(),
    ammount: ammount.required(), 
    date: date.required(), 
    type: type.required(), 
    category: category.required(),
})

const updateOperationSchema = Joi.object({
    concept: concept,
    ammount: ammount, 
    date: date, 
    type: type, 
    category: category,
})

const getOperationSchema = Joi.object({
    id: idoperation,
})

module.exports = {createOperationSchema, updateOperationSchema, getOperationSchema};