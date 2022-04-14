const {CommandBusMiddleware} = require('../command/commandBusMiddleware');

class DomainEventDispatcher extends CommandBusMiddleware {
  /** @type {DomainEventBus} */
  #eventBus;

  constructor(eventBus) {
    super();

    this.#eventBus = eventBus;
  }

  async dispatch(command, next) {
    const response = await next.dispatch(command);

    response.events.forEach(this.#eventBus.dispatch.bind(this.#eventBus));

    return response;
  }
}

module.exports = {DomainEventDispatcher};