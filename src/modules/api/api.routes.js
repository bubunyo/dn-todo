import { Router } from 'express';
import { version } from '../../../package.json';
import TodoRouter from '../todo/todo.routes';

// Declare Router
const apiRouter = Router();

// get version number of  the api
apiRouter.get('/', (req, res) => {
  res.json({
    version,
  });
});

apiRouter.use('/todos', TodoRouter);

// Plug module routers

//

export default apiRouter;
