const express = require("express")
const router = express.Router()
const Todo = require("../models/Todo")

//view all
router.get("/", (req,res) => {
    Todo.find({}, (err,todos) =>{
        return res.json(todos)
    })
    
})
//add a todo
router.post("/", (req,res) => {
    Todo.findOne({name:req.body.name}, (err,todo) =>{
        if(todo) return res.status(400).json({message: "Todo already exists"})
        todo = new Todo()
        todo.name = req.body.name
        todo.save()
        return res.json(todo)
    })
    
})

//edit todo
router.put("/:id", (req,res)=>{
    const todo = {}
    todo.name = req.body.name

    Todo.findOneAndUpdate(
        {_id:req.params.id},
        todo,
        {new:true},
        (err, newTodo) => {
            return res.json(newTodo);
        }
    )
})

//complete a todo
router.patch("/:id", (req,res)=>{
    Todo.findOne({_id:req.params.id}, (err,todo) => {
        todo.isCompleted = true;
        todo.save();
        return res.json(todo)
    })
})
//delete todo
router.delete("/:id", (req,res)=>{
    Todo.findOneAndDelete({_id:req.params.id}, (err,todo)=>{
        return res.json(todo)
    })
})
module.exports = router;
