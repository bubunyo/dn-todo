import HTTPStatus from 'http-status';
import Todo from './todo.model';

export const getTodos = async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findById(id);
  if (!todo) {
    res.sendStatus(HTTPStatus.NOT_FOUND);
    return;
  }
  res.send(todo);
};

export const createTodo = async (req, res) => {
  const todo = await Todo.create({ ...req.body });
  res.status(HTTPStatus.CREATED).json(todo);
};

export const getTodo = async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findById(id);
  if (!todo) {
    res.sendStatus(HTTPStatus.NOT_FOUND);
    return;
  }
  res.send(todo);
};

export const updateTodo = async (req, res) => {
  const id = req.id;
  const todo = await Todo.findById(id);
  if (!todo) {
    res.sendStatus(HTTPStatus.NOT_FOUND);
    return;
  }
  Object.keys(req.body).forEach((key) => {
    todo[key] = req.body[key];
  });
  await todo.save();
  res.status(HTTPStatus.OK).json(todo.toJson());
};


export const deleteTodo = async (req, res) => {
  const id = req.id;
  const todo = await Todo.findById(id);
  if (!todo) {
    res.sendStatus(HTTPStatus.NOT_FOUND);
    return;
  }
  await todo.destroy();
  res.sendStatus(HTTPStatus.NO_CONTENT);
};

