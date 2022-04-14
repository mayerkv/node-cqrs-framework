const {QueryBusMiddleware} = require('./queryBusMiddleware');
const {QueryBusMapImpl} = require('./queryBusMapImpl');

class QueryBusFactory {
  /** @type {QueryHandlersRegistry} */
  #queryHandlersRegistry;

  /** @type {Array<QueryBusMiddleware>} */
  #middlewares;

  constructor(queryHandlersRegistry, ...middlewares) {
    this.#queryHandlersRegistry = queryHandlersRegistry;
    this.#middlewares = middlewares;
  }

  create() {
    return QueryBusMiddleware
      .compositeOf(...this.#middlewares)
      .decorate(new QueryBusMapImpl(this.#queryHandlersRegistry.handlers));
  }

  static builder() {
    return new class {
      #middlewares = new Set();
      #queryHandlersRegistry = null;

      /**
       * @param {QueryHandlersRegistry} queryHandlersRegistry
       * @return {this}
       */
      registry(queryHandlersRegistry) {
        this.#queryHandlersRegistry = queryHandlersRegistry;

        return this;
      }

      /**
       * @param {QueryBusMiddleware} middlewares
       * @return {this}
       */
      middleware(...middlewares) {
        middlewares.forEach((middleware) => this.#middlewares.add(middleware));

        return this;
      }

      /**
       * @return {QueryBusFactory}
       */
      build() {
        return new QueryBusFactory(this.#queryHandlersRegistry, ...this.#middlewares);
      }
    }();
  }
}

module.exports = {QueryBusFactory};