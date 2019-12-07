import fs from 'fs';
import path from 'path';
import constant from '../../config/constants';


const _jsonFile = path.join(__dirname, `_todo.${constant.ENV}.json`);
class Todo {
  constructor(text, priority = 3, done = false) {
    if (text === null || text === undefined || text.length === 0) {
      throw (new Error('the text field should not be empty'));
    }
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
  static findById(id) {}
  static delete(id) {}
  async save() {
    const now = Date.now();
    if (this.createdAt === undefined) {
      this.createdAt = now;
    }
    this.updatedAt = now;
    const data = await Todo.findAll();
    data.push(this);
    await Todo._writeJsonFile(data);
  }
}


export default Todo;
