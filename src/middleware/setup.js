import bodyParser from 'body-parser';
import cors from 'cors';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import methodOverride from 'method-override';
import { isDev } from '../config/constants';


export default (app) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());


  if (isDev()) {
    app.use(morgan('dev'));
    app.use(errorhandler());
  }
};
