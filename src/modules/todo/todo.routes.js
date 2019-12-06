import { Router } from 'express';
import validate from 'express-validation';
import * as c from './todo.controller';
import v from './todo.validation';
import { authJwt } from '../../config/passport';

const TodoRouter = Router();

TodoRouter.get('/:id', authJwt, c.getTodo);
TodoRouter.post('/', validate(v.createTodo), c.createTodo);
TodoRouter.patch('/:id', validate(v.updateTodo), authJwt, c.updateTodo);
TodoRouter.delete('/:id', authJwt, c.deleteTodo);

export default TodoRouter;
