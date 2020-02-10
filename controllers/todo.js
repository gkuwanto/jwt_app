const express = require('express');
const router = express.Router();
const db = require('../models/index');
const Todo = db.todo;
const assert = require('assert');

router.use(require('../middlewares/validator'));

router.get('/', async (req,res,next)=>{
    try {
        return res.send(
            await Todo.findAll()
        );
    } catch(err){
        next(err);
    }
});

router.post('/', async (req, res, next)=>{
    try {
        assert(req.body.title);

        return res.status(201).json(
            await Todo.create({title: req.body.title})
        );
    } catch(err) {
        next(err);
    }
});

router.get('/:id', (req,res,next)=>{
    try {
        Todo.findOne({where:{id:req.params.id}})
            .then(todo => 
                res.json(todo)
            )
            .catch(err=>{
                throw err;
            });
    } catch(err) {
        next(err);
    }
});

router.put('/:id', (req, res, next)=>{
    try {
        Todo.findOne({where:{id:req.params.id}})
            .then(todo => {
                todo.title = req.body.title;
                todo.save();
            })
            .then(()=>res.status(204).send())
            .catch(err=>{
                throw err;
            });
    } catch(err) {
        next(err);
    }
});

router.delete('/:id', (req, res, next)=>{
    try {
        Todo.findOne({where:{id:req.params.id}})
            .then(todo => {
                todo.destroy();
            })
            .then(()=>res.status(204).send())
            .catch(err=>{
                throw err;
            });
    } catch(err) {
        next(err);
    }
});

router.post('/transaction_demo', (req, res, next) => {
    try {
        assert(req.body.title);

        return db.sequelize.transaction(t=>{
            return Todo.create(
                {title: req.body.title},
                {transaction: t}
            ).then(todo=>{
                const id = todo.id;
                const title = todo.title;

                return todo.update(
                    {title:id+'-'+title},
                    {transaction: t}
                );
            }).then((result)=>res.status(201).send(result));
        });
    } catch(err) {
        next(err);
    }
});

module.exports = router;