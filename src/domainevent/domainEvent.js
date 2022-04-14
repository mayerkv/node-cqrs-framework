/**
 * @interface
 */
class DomainEvent {
  constructor() {
    if (new.target === this) {
      throw new Error('must be implemented');
    }
  }

  /**
   * @return {Date}
   */
  occurredOn() {
    throw new Error('must be implemented');
  }
}

module.exports = {DomainEvent};