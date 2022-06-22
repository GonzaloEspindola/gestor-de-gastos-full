const Joi = require('joi');

// const idOperation
const email = Joi.string().email()
const password = Joi.string().alphanum().min(6).max(14)
// const idUser

const createAccountSchema = Joi.object({
    email: email.required(),
    password: password.required(),
})

const findAccountSchema = Joi.object({
    email: email,
})

module.exports = {createAccountSchema, findAccountSchema};