import HTTPStatus from 'http-status';
import Todo from './todo.model';

export const getTodos = async (req, res) => {
  res.send(await Todo.findAll());
};

export const createTodo = async (req, res) => {
  const data = req.body;
  const todo = new Todo(
    data.text,
    data.priority,
    data.done,
  );
  await todo.save();
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
  const id = req.params.id;
  const todo = await Todo.findById(id);
  if (!todo) {
    res.sendStatus(HTTPStatus.NOT_FOUND);
    return;
  }
  Object.keys(req.body).forEach((key) => {
    todo[key] = req.body[key];
  });
  await todo.save();
  res.json(todo);
};


export const deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    await Todo.delete(id);
    res.sendStatus(HTTPStatus.NO_CONTENT);
  } catch (ex) {
    res.sendStatus(HTTPStatus.NOT_FOUND);
  }
};

Todo.watchCollection(1);

