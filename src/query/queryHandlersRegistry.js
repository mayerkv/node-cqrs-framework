class QueryHandlersRegistry {
  /** @type {Map<function, QueryHandler>} */
  #handlers;

  constructor(handlers) {
    this.#handlers = handlers;
  }

  get handlers() {
    return this.#handlers;
  }

  static builder() {
    return new class {
      #handlers = new Map();

      register(constructor, handler) {
        this.#handlers.set(constructor, handler);

        return this;
      }

      build() {
        return new QueryHandlersRegistry(this.#handlers);
      }
    }();
  }
}

module.exports = {QueryHandlersRegistry};