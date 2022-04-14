const {QueryBusMiddleware} = require('../../../src/query/queryBusMiddleware');
const {QueryBusMapImpl} = require('../../../src/query/queryBusMapImpl');

class QueryBusFactory {
  /** @type {QueryHandlersRegistry} */
  queryHandlersRegistry;

  constructor(queryHandlersRegistry) {
    this.queryHandlersRegistry = queryHandlersRegistry;
  }

  simpleBus() {
    return QueryBusMiddleware
      .compositeOf(
        // add middlewares here
      )
      .decorate(new QueryBusMapImpl(this.queryHandlersRegistry.handlers));
  }
}

module.exports = {QueryBusFactory};