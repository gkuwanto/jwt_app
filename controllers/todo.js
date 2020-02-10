const express = require('express');
const router = express.Router();
const db = require('../models/index');
const Todo = db.todo;

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

module.exports = router;