const express = require('express');
const router = express.Router();
const UsersService = require('../services/usersService');
const validatorHandler = require('../middlewares/validatorHandler');
const {createAccountSchema, findAccountSchema } = require('../schemas/userSchema');

const service = new UsersService();

/* find all */ 
router.get('/', async (req,res, next) => {
    try {
        const users = await service.find();
        res.json(users)
    } catch (error) {
        next(error)
    }
})

/* find by email */ 
router.post('/byemail', validatorHandler(findAccountSchema, 'body') ,async (req,res, next) => {
    try {
        const body = req.body;
        const users = await service.findByEmail(body.email);
        res.json(users)
    } catch (error) {
        next(error)
    }
})

/* create user */
router.post('/', validatorHandler(createAccountSchema, 'body'), async (req, res, next) => {
    try {
        const body = req.body;
        const newUser = await service.create(body)
        res.json({
            message: 'User create',
            data: body.email
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;