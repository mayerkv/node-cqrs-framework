/* eslint-disable no-unused-vars */

/**
 * @interface
 */
class DomainEventBus {
  constructor() {
    if (new.target === this) {
      throw new Error('must be implemented');
    }
  }

  /**
   * @param {DomainEvent} event
   * @return void
   */
  dispatch(event) {
    throw new Error('must be implemented');
  }
}

module.exports = {DomainEventBus};