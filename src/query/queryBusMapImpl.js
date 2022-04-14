const {QueryBus} = require('./queryBus');

class QueryBusMapImpl extends QueryBus {
  /** @type {Map<function, QueryHandler>} */
  #handlers;

  constructor(handlers) {
    super();

    this.#handlers = handlers;
  }

  /**
   * @param {Query} query
   * @return {Promise<any>}
   */
  dispatch(query) {
    if (!this.#handlers.has(query.constructor)) {
      throw new Error(`Unsupported query '${query.constructor.name}'`);
    }

    const handler = this.#handlers.get(query.constructor);

    return handler.handle(query);
  }

  static builder() {
    return new class {
      #handlers = new Map();

      add(constructor, handler) {
        this.#handlers.set(constructor, handler);

        return this;
      }

      build() {
        return new QueryBusMapImpl(this.#handlers);
      }
    }();
  }
}

module.exports = {QueryBusMapImpl};