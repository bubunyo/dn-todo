import { Router } from 'express';
import validate from 'express-validation';
import * as c from './todo.controller';
import v from './todo.validation';

const TodoRouter = Router();

TodoRouter.get('/', c.getTodos);
TodoRouter.post('/', validate(v.todo), c.createTodo);
TodoRouter.get('/:id', c.getTodo);
TodoRouter.put('/:id', validate(v.todo), c.updateTodo);
TodoRouter.delete('/:id', c.deleteTodo);

export default TodoRouter;
