/* eslint-disable no-unused-vars */
const {CommandBus} = require('./commandBus');

/**
 * @interface
 */
class CommandBusMiddleware {
  constructor() {
    if (new.target === this) {
      throw new Error('must be implemented');
    }
  }

  /**
   * @param {Command} command
   * @param {CommandBus} next
   * @return {Promise<CommandResponse>}
   */
  dispatch(command, next) {
    throw new Error('must be implemented');
  }

  static neutral() {
    return new class extends CommandBusMiddleware {

      dispatch(command, next) {
        return next.dispatch(command);
      }
    }();
  }

  /**
   * @param {CommandBus} commandBus
   * @return {CommandBus}
   */
  decorate(commandBus) {
    const self = this;

    return new class extends CommandBus {
      dispatch(command) {
        return self.dispatch(command, commandBus);
      }
    }();
  }

  /**
   * @param {CommandBusMiddleware} commandBusMiddleware
   * @return {CommandBusMiddleware}
   */
  compose(commandBusMiddleware) {
    const self = this;

    return new class extends CommandBusMiddleware {
      dispatch(command, next) {
        return self.dispatch(command, commandBusMiddleware.decorate(next));
      }
    }();
  }

  /**
   * @param {CommandBusMiddleware} middlewares
   * @return {CommandBusMiddleware}
   */
  static compositeOf(...middlewares) {
    return middlewares.reduce((m1, m2) => m1.compose(m2), CommandBusMiddleware.neutral());
  }
}

module.exports = {CommandBusMiddleware};