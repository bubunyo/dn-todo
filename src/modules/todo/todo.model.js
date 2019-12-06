import Sequelize from 'sequelize';
import sequelize from '../../db';

// Refer to http://docs.sequelizejs.com/manual/models-definition.html
// on how to define your model

const Todo = sequelize.define('todo', {
  id: { type: Sequelize.STRING, primaryKey: true },

  //other model attributes go here

});

Todo.prototype.toJson = function toJson() {
  return {
    ...this.get({ plain: true }),
  };
};


export default Todo;
