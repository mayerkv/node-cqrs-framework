/* eslint-disable no-unused-vars */
const {QueryBus} = require('./queryBus');

/**
 * @interface
 */
class QueryBusMiddleware {
  constructor() {
    if (new.target === this) {
      throw new Error('must be implemented');
    }
  }

  /**
   * @param {Query} query
   * @param {QueryBus} queryBus
   * @return {Promise<any>}
   */
  dispatch(query, queryBus) {
    throw new Error('must be implemented');
  }

  static neutral() {
    return new class extends QueryBusMiddleware {
      dispatch(query, next) {
        return next.dispatch(query);
      }
    }();
  }

  /**
   * @param {QueryBus} queryBus
   * @return {QueryBus}
   */
  decorate(queryBus) {
    const self = this;

    return new class extends QueryBus {
      dispatch(query) {
        return self.dispatch(query, queryBus);
      }
    }();
  }

  /**
   * @param {QueryBusMiddleware} queryBusMiddleware
   * @return {QueryBusMiddleware}
   */
  compose(queryBusMiddleware) {
    const self = this;

    return new class extends QueryBusMiddleware {
      dispatch(query, queryBus) {
        return self.dispatch(query, queryBusMiddleware.decorate(queryBus));
      }
    }();
  }

  /**
   * @param {QueryBusMiddleware} middlewares
   * @return {QueryBusMiddleware}
   */
  static compositeOf(...middlewares) {
    return middlewares.reduce((m1, m2) => m1.compose(m2), QueryBusMiddleware.neutral());
  }
}

module.exports = {QueryBusMiddleware};