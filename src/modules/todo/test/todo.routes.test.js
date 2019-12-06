import HTTPStatus from 'http-status';
import request from 'supertest-as-promised';
import { nuke } from '../../../helpers/test_helpers';
import Todo from '../todo.model';
import server from '../../../server';

describe('Todo:Routes', async () => {
  beforeEach(async () => {
    await nuke();
  });

  it.skip('skip this test', async () => {
    const todo = await Todo.create({
          //
    });

    const res = await request(server).get('/api/todo/');

    expect(res.statusCode).toBe(HTTPStatus.OK);
    expect(res.body.id).toBe(todo.id);
  });
});
