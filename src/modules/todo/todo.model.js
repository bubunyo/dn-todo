import fs from 'fs';
import path from 'path';
import uuidv4 from 'uuid/v4';
import constant from '../../config/constants';


const _jsonFile = path.join(__dirname, `_todo.${constant.ENV}.json`);

class Todo {
  constructor(text, priority = 3, done = false) {
    if (!text) {
      throw (new Error('the text field should not be empty'));
    }
    this.id = uuidv4();
    this.text = text;
    this.priority = priority;
    this.done = done;
  }


  static async _readJsonFile() {
    if (!fs.existsSync(_jsonFile)) {
      await Todo._writeJsonFile([]);
      return [];
    }
    const jsonString = await fs.readFileSync(_jsonFile, 'utf8');
    return JSON.parse(jsonString);
  }

  static async _writeJsonFile(data) {
    await fs.writeFileSync(_jsonFile, JSON.stringify(data));
  }

  // reset removes the json file that is associated with this model.
  // USE WITH CARE
  static async reset() {
    if (fs.existsSync(_jsonFile)) {
      await fs.unlinkSync(_jsonFile);
    }
  }

  static findAll() {
    return Todo._readJsonFile();
  }

  static async findById(id) {
    const data = await Todo.findAll();
    const d = data.find(e => e.id === id);
    if (d) {
      const t = new Todo(' ');
      Object.keys(d).forEach((key) => {
        t[key] = d[key];
      });
      return t;
    }
    return null;
  }

  static async delete(id) {
    const data = await Todo.findAll();
    const index = data.findIndex(e => e.id === id);
    if (index < 0) {
      throw new Error(`item with id ${id} does not exist`);
    }
    data.splice(index, 1);
    await Todo._writeJsonFile(data);
  }

  async save() {
    const now = Date.now();
    if (!this.createdAt) {
      this.createdAt = now;
    }
    this.updatedAt = now;
    const data = await Todo.findAll();
    const index = data.findIndex(e => e.id === this.id);
    if (index > -1) {
      data.splice(index, 1);
    }
    data.push(this);
    await Todo._writeJsonFile(data);
  }
}


export default Todo;
