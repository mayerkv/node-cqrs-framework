/* eslint-disable no-unused-vars */

/**
 * @interface
 */
class DomainEventHandler {
  constructor() {
    if (new.target === this) {
      throw new Error('must be implemented');
    }
  }

  /**
   * @param {DomainEvent} event
   */
  handle(event) {
    throw new Error('must be implemented');
  }
}

module.exports = {DomainEventHandler};