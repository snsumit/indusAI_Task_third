const Todo = require("../TodoModel");
const { formatDueDate } = require("../../middlewares/formatDate");

const validateTodo = (todo) => {
  const { priority, status, category, dueDate } = todo;

  if (!['HIGH', 'MEDIUM', 'LOW'].includes(priority)) {
    return 'Invalid Todo Priority';
  }
  if (!['TO DO', 'IN PROGRESS', 'DONE'].includes(status)) {
    return 'Invalid Todo Status';
  }
  if (!['WORK', 'HOME', 'LEARNING'].includes(category)) {
    return 'Invalid Todo Category';
  }
  if (!dueDate || isNaN(new Date(dueDate))) {
    return 'Invalid Due Date';
  }
  return null;
};


const getTodos = async (req, res) => {
  try {
    const { status, priority, category, search_q } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    if (search_q) filter.todo = new RegExp(search_q, 'i');

    const todos = await Todo.find(filter);
    res.json(todos.map((todo) => ({
      id: todo.id,
      todo: todo.todo,
      priority: todo.priority,
      category: todo.category,
      status: todo.status,
      dueDate: formatDueDate(todo.due_date),
    })));
  } catch (err) {
    res.status(500).send('Server Error');
  }
};


const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.todoId });
    if (!todo) return res.status(404).send('Todo not found');
    
    res.json({
      id: todo.id,
      todo: todo.todo,
      priority: todo.priority,
      category: todo.category,
      status: todo.status,
      dueDate: formatDueDate(todo.due_date),
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};


const createTodo = async (req, res) => {
  const { id, todo, priority, category, status, dueDate } = req.body;
  const error = validateTodo({ priority, status, category, dueDate });
  if (error) return res.status(400).send(error);

  try {
    const newTodo = new Todo({
      id,
      todo,
      priority,
      category,
      status,
      due_date: new Date(dueDate),
    });
    await newTodo.save();
    res.send('Todo Successfully Added');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};


const updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const updateFields = req.body;

  try {
    const todo = await Todo.findOne({ id: todoId });
    if (!todo) return res.status(404).send('Todo not found');

    Object.keys(updateFields).forEach(field => {
      todo[field] = updateFields[field];
    });

    await todo.save();
    res.send('Todo Updated');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};


const deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete({ id: req.params.todoId });
    res.send('Todo Deleted');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
