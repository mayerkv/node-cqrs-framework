const {CommandBus} = require('./commandBus');

class CommandBusMapImpl extends CommandBus {
  /** @type {Map<function, CommandHandler>} */
  #handlers;

  constructor(handlers) {
    super();

    this.#handlers = handlers;
  }

  dispatch(command) {
    if (!this.#handlers.has(command.constructor)) {
      throw new Error(`Unsupported command '${command.constructor.name}'`);
    }

    const handler = this.#handlers.get(command.constructor);

    return handler.handle(command);
  }

  static builder() {
    return new class {
      #handlers = new Map();

      add(constructor, handler) {
        this.#handlers.set(constructor, handler);

        return this;
      }

      build() {
        return new CommandBusMapImpl(this.#handlers);
      }
    }();
  }
}

module.exports = {CommandBusMapImpl};