const {DomainEventHandler} = require('../../../src/domainevent/domainEventHandler');

class UserCreatedHandler extends DomainEventHandler {
  #logger = console;

  /**
   * @param {UserCreated} event
   */
  handle(event) {
    this.#logger.log(event);
  }
}

module.exports = {UserCreatedHandler};