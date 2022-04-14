const express = require('express');
const {CommandHandlersRegistry} = require('./utils/commandHandlersRegistry');
const {CreateUserCommand} = require('./command/createUserCommand');
const {CreateUserCommandHandler} = require('./command/createUserCommandHandler');
const {InMemoryUserRepository} = require('./infrastructure/inMemoryUserRepository');
const {QueryHandlersRegistry} = require('./utils/queryHandlersRegistry');
const {GetUserQuery} = require('./query/getUserQuery');
const {GetUserQueryHandler} = require('./query/getUserQueryHandler');
const {UserController} = require('./controller/userController');
const {CommandBusFactory} = require('./utils/commandBusFactory');
const {QueryBusFactory} = require('./utils/queryBusFactory');
const bodyParser = require('body-parser');
const {UserCreated} = require('./domainevents/userCreated');
const {UserCreatedHandler} = require('./domainevents/userCreatedHandler');
const {DomainEventBusMapImpl} = require('../../src/domainevent/domainEventBusMapImpl');

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
const commandBusFactory = new CommandBusFactory(domainEventBus, commandHandlersRegistry);
const queryBusFactory = new QueryBusFactory(queryHandlersRegistry);
const commandBus = commandBusFactory.simpleBus();
const queryBus = queryBusFactory.simpleBus();
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