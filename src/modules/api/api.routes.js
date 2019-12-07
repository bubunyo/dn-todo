import { Router } from 'express';
import TodoRouter from '../todo/todo.routes';

// Declare Router
const apiRouter = Router();
apiRouter.use('/todos', TodoRouter);

export default apiRouter;
