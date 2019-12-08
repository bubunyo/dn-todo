# Todo

## Setup
```
yarn install
```

## Run Tests
```
yarn test -i
```

### Run Tests with Coverage
```
yarn test:coverage
```

### Run Tests with Watcher
```
yarn test:watch
```

### Run App

### In development mode
```
yarn dev
```

### In production mode
```
yarn start
```

## Endpoints

### GET /todos

List all of the todos as an array of the todo objects.

### POST /todos

Creates a new todo, sets the given fields from the request body. Returns the new todo object.

### GET /todos/:id

Returns the todo object.

### PUT /todos/:id

Updates the given fields in the todo. Returns the new todo object.

### DELETE /todos/:id
