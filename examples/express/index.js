const express = require('express');
const bodyParser = require('body-parser');

const {InMemoryUserRepository} = require('./infrastructure/inMemoryUserRepository');
const {CreateUserCommand} = require('./command/createUserCommand');
const {CreateUserCommandHandler} = require('./command/createUserCommandHandler');
const {GetUserQuery} = require('./query/getUserQuery');
const {GetUserQueryHandler} = require('./query/getUserQueryHandler');
const {UserController} = require('./controller/userController');
const {UserCreated} = require('./domainevents/userCreated');
const {UserCreatedHandler} = require('./domainevents/userCreatedHandler');

const {
  CommandBusFactory,
  CommandHandlersRegistry,
  DomainEventBusMapImpl,
  DomainEventDispatcher,
  QueryBusFactory,
  QueryHandlersRegistry
} = require('../../src');

const userRepository = new InMemoryUserRepository();

const commandHandlersRegistry = CommandHandlersRegistry
  .builder()
  .register(CreateUserCommand, new CreateUserCommandHandler(userRepository))
  .build();
const queryHandlersRegistry = QueryHandlersRegistry
  .builder()
  .register(GetUserQuery, new GetUserQueryHandler(userRepository))
  .build();

const domainEventBus = DomainEventBusMapImpl
  .builder()
  .register(UserCreated, new UserCreatedHandler())
  .build();

const commandBusFactory = CommandBusFactory
  .builder()
  .registry(commandHandlersRegistry)
  .middleware(new DomainEventDispatcher(domainEventBus))
  .build();

const queryBusFactory = QueryBusFactory
  .builder()
  .registry(queryHandlersRegistry)
  .middleware()
  .build();

const commandBus = commandBusFactory.create();
const queryBus = queryBusFactory.create();

const userController = new UserController(commandBus, queryBus);

const port = 3000;
const app = express();

const wrapAsync = (fn) => {
  return async(req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

const usersRouter = () => {
  const router = express.Router();

  router.get('/users/:userId', wrapAsync(userController.getUser.bind(userController)));
  router.post('/users', wrapAsync(userController.createUser.bind(userController)));

  return router;
};

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(usersRouter());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});