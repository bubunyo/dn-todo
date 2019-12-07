import Todo from '../todo.model';

describe('Todo:Controller', async () => {
  beforeEach(async () => {
    await Todo.reset();
  });

  it('throw exception when todo initialized without text ', async () => {
    const t = () => { Todo(); };
    expect(t).toThrow(Error);
  });

  it('initialize todo with default params', async () => {
    const t = new Todo('do this');
    expect(typeof t.id).toBe('string');
    expect(t.text).toBe('do this');
    expect(t.priority).toBe(3);
    expect(t.done).toBe(false);
    expect(t.createdAt).toBe(undefined);
    expect(t.updatedAt).toBe(undefined);
  });

  it('initialize todo with default params', async () => {
    const todos = await Todo.findAll();
    expect(todos).toHaveLength(0);
  });

  it('save todo', async () => {
    const t = new Todo('where you dey');
    await t.save();
    const todos = await Todo.findAll();
    expect(todos).toHaveLength(1);
    expect(todos[0].text).toBe('where you dey');
    expect(todos[0].priority).toBe(3);
    expect(todos[0].done).toBe(false);
    expect(typeof todos[0].createdAt).toBe('number');
    expect(typeof todos[0].updatedAt).toBe('number');
    // expect(t.updatedAt).toBe(undefined);
  });
  it('save multiple todos', async () => {
    const t1 = new Todo('where you dey 1');
    await t1.save();
    const t2 = new Todo('where you dey 2');
    await t2.save();
    const t3 = new Todo('where you dey 3');
    await t3.save();
    const todos = await Todo.findAll();
    expect(todos).toHaveLength(3);
  });
  it('find todo by id', async () => {
    const t1 = new Todo('where you dey 1');
    await t1.save();
    const t2 = new Todo('where you dey 2');
    await t2.save();

    const t3 = await Todo.findById(t2.id);
    expect(t2.id).toMatch(t3.id);
  });
  it('delete todo', async () => {
    const t = new Todo('where you dey 1');
    await t.save();

    let todos = await Todo.findAll();
    expect(todos).toHaveLength(1);
    await Todo.delete(t.id);

    todos = await Todo.findAll();
    expect(todos).toHaveLength(0);
  });

  it('update todo', async () => {
    const t = new Todo('where you dey 1');
    await t.save();
    expect(t.text).toMatch('where you dey 1');
    t.text = 'blow my mind';
    await t.save();

    const t2 = await Todo.findById(t.id);
    expect(t2.id).toMatch(t.id);
    expect(t2.text).toMatch('blow my mind');
  });
});
