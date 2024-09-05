const express = require('express');
const { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } = require("../controllers/TodoControllers");

const router = express.Router();

router.get('/todos', getTodos);
router.get('/todos/:todoId', getTodoById);
router.post('/todos', createTodo);
router.put('/todos/:todoId', updateTodo);
router.delete('/todos/:todoId', deleteTodo);

module.exports = router;
