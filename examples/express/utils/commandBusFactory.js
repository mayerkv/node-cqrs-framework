const {CommandBusMiddleware} = require('../../../src/command/commandBusMiddleware');
const {CommandBusMapImpl} = require('../../../src/command/commandBusMapImpl');
const {DomainEventDispatcher} = require('../../../src/domainevent/domainEventDispatcher');

class CommandBusFactory {
  /** @type {DomainEventBus} */
  domainEventBus;

  /** @type {CommandHandlersRegistry} */
  commandHandlersRegistry;

  constructor(domainEventBus, commandHandlersRegistry) {
    this.domainEventBus = domainEventBus;
    this.commandHandlersRegistry = commandHandlersRegistry;
  }

  simpleBus() {
    return CommandBusMiddleware
      .compositeOf(
        // add all middlewares here
        new DomainEventDispatcher(this.domainEventBus)
      )
      .decorate(new CommandBusMapImpl(this.commandHandlersRegistry.handlers));
  }
}

module.exports = {CommandBusFactory};