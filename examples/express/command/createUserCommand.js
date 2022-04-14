const {Command} = require('../../../src/command/command');

class CreateUserCommand extends Command {
  name;

  constructor(name) {
    super();

    this.name = name;
  }
}

module.exports = {CreateUserCommand};