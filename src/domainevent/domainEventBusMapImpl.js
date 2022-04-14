const {DomainEventBus} = require('./domainEventBus');

class DomainEventBusMapImpl extends DomainEventBus {
  /** @type {Map<function, Array<DomainEventHandler>>} */
  #handlers;

  constructor(handlers) {
    super();
    this.#handlers = handlers;
  }

  dispatch(event) {
    const handlers = this.#handlers.get(event.constructor) || [];

    handlers.forEach((handler) => handler.handle(event));
  }

  static builder() {
    return new class {
      #handlers = new Map();

      register(constructor, handler) {
        if (!this.#handlers.has(constructor)) {
          this.#handlers.set(constructor, []);
        }

        this.#handlers.get(constructor).push(handler);

        return this;
      }

      build() {
        return new DomainEventBusMapImpl(this.#handlers);
      }
    }();
  }
}

module.exports = {DomainEventBusMapImpl};