const {CommandHandler} = require('../../../src/command/commandHandler');
const {User} = require('../domain/user');
const {CommandResponse} = require('../../../src/command/commandResponse');
const {UserCreated} = require('../domainevents/userCreated');

class CreateUserCommandHandler extends CommandHandler {
  /** @type {UserRepository} */
  userRepository;

  constructor(userRepository) {
    super();
    this.userRepository = userRepository;
  }

  /**
   * @param {CreateUserCommand} command
   * @return {Promise<CommandResponse>}
   */
  async handle(command) {
    const user = User.create(command.name);

    await this.userRepository.save(user);

    return CommandResponse.withResult(user.id, new UserCreated(user));
  }
}

module.exports = {CreateUserCommandHandler};