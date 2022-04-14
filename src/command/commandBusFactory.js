const {CommandBusMiddleware} = require('./commandBusMiddleware');
const {CommandBusMapImpl} = require('./commandBusMapImpl');

class CommandBusFactory {
  /** @type {CommandHandlersRegistry} */
  #commandHandlersRegistry;

  /** @type {Array<CommandBusMiddleware>} */
  #middlewares;

  constructor(commandHandlersRegistry, ...middlewares) {
    this.#commandHandlersRegistry = commandHandlersRegistry;
    this.#middlewares = middlewares;
  }

  /**
   * @return {CommandBus}
   */
  create() {
    return CommandBusMiddleware
      .compositeOf(...this.#middlewares)
      .decorate(new CommandBusMapImpl(this.#commandHandlersRegistry.handlers));
  }

  static builder() {
    return new class {
      #middlewares = new Set();
      #commandHandlersRegistry = null;

      /**
       * @param {CommandHandlersRegistry} commandHandlersRegistry
       * @return {this}
       */
      registry(commandHandlersRegistry) {
        this.#commandHandlersRegistry = commandHandlersRegistry;

        return this;
      }

      /**
       * @param {CommandBusMiddleware} middlewares
       * @return {this}
       */
      middleware(...middlewares) {
        middlewares.forEach((middleware) => this.#middlewares.add(middleware));

        return this;
      }

      /**
       * @return {CommandBusFactory}
       */
      build() {
        return new CommandBusFactory(this.#commandHandlersRegistry, ...this.#middlewares);
      }
    }();
  }
}

module.exports = {CommandBusFactory};