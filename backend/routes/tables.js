const express = require('express');
const router = express.Router();
const TablesService = require('../services/tablesService');
const validatorHandler = require('../middlewares/validatorHandler');
const {createOperationSchema, updateOperationSchema, getOperationSchema} = require('../schemas/tablesSchema');
const service = new TablesService();

router.get('/', async (req,res, next) => {
    try {
        const user = req.user.sub;
        const table = await service.find(user);
        res.json(table);
    } catch (error) {
        next(error)
    }
})

/* get one */
router.get('/:id',  validatorHandler(getOperationSchema, 'params') ,async (req, res, next) => {
    try {
        const user = req.user.sub;
        const {id} = req.params;
        const table = await service.findOne(id, user);
        res.json(table);
    } catch (error) {
        next(error)
    }
})

/* create input */
router.post('/' ,validatorHandler(createOperationSchema, 'body'), async (req, res, next) => {
    try {
        const user = req.user.sub;
        const body = req.body;
        const newOperation = await service.create(body, user);

        res.json({
            message: 'Operation create',
            data: newOperation
        })
    } catch (error) {
        next(error);
    }
})

/* update input */
router.put('/:id', validatorHandler(updateOperationSchema, 'body'), async (req, res, next) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const newOperation = await service.update(id, body);
        res.json({
            message: 'Operation update',
            data: newOperation
        })
    } catch (error) {
        next(error)
    }
    
})

/* delete input */
router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const deleteOperation = await service.delete(id);
        res.json({
            message: 'Operation deleted',
            data: deleteOperation
        })
    } catch (error) {
        next(error);
    }
    
})

module.exports = router;