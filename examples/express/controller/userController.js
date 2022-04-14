const {GetUserQuery} = require('../query/getUserQuery');
const {CreateUserCommand} = require('../command/createUserCommand');

class UserController {
  /** @type {CommandBus} */
  #commandBus;

  /** @type {QueryBus} */
  #queryBus;


  constructor(commandBus, queryBus) {
    this.#commandBus = commandBus;
    this.#queryBus = queryBus;
  }

  async getUser(req, res) {
    const query = new GetUserQuery(req.params.userId);
    const user = await this.#queryBus.dispatch(query);

    res.json(user);
  }

  async createUser(req, res) {
    const command = new CreateUserCommand(req.body.name);
    const response = await this.#commandBus.dispatch(command);

    res.json({id: response.result});
  }
}

module.exports = {UserController};