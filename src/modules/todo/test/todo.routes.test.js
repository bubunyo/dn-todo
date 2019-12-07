import HTTPStatus from 'http-status';
import request from 'supertest';
import Todo from '../todo.model';
import app from '../../../app';

describe('Todo:Routes', async () => {
  beforeEach(async () => {
    await Todo.reset();
  });

  it('get todos', async () => {
    const t = new Todo('test tile');
    await t.save();
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(HTTPStatus.OK);
    expect(res.body).toHaveLength(1);
  });
  it('create todos', async () => {
    const res = await request(app).post('/todos')
      .send({
        text: 'Things we do',
        priority: 5,
        done: true,
      });
    expect(res.statusCode).toBe(HTTPStatus.CREATED);
    expect(res.body.text).toBe('Things we do');
    expect(res.body.priority).toBe(5);
    expect(res.body.done).toBe(true);
  });
  it('should return not found', async () => {
    const res = await request(app).get('/todos/abcd1234');
    expect(res.statusCode).toBe(HTTPStatus.NOT_FOUND);
  });
  it('find todos by id', async () => {
    const t = new Todo('test file');
    await t.save();
    const res = await request(app).get(`/todos/${t.id}`);
    expect(res.statusCode).toBe(HTTPStatus.OK);
    expect(res.body.text).toBe('test file');
  });
  it('should update todo', async () => {
    const t = new Todo('test file');
    await t.save();
    expect(t.createdAt).toBe(t.updatedAt);
    const res = await request(app).put(`/todos/${t.id}`)
      .send({
        text: 'test file 2',
        done: true,
        priority: 1,
      });
    expect(res.statusCode).toBe(HTTPStatus.OK);
    expect(res.body.text).toBe('test file 2');
    expect(res.body.done).toBe(true);
    expect(res.body.priority).toBe(1);
    expect(res.body.createdAt).not.toBe(res.body.updatedAt);
  });
  it('delete todos', async () => {
    const t = new Todo('test tile');
    await t.save();
    const t2 = new Todo('test tile');
    await t2.save();
    const res = await request(app).delete(`/todos/${t.id}`);
    expect(res.statusCode).toBe(HTTPStatus.NO_CONTENT);
  });
});
