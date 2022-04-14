/* eslint-disable no-unused-vars */

/**
 * @interface
 */
class QueryHandler {
  constructor() {
    if (new.target === this) {
      throw new Error('must be implemented');
    }
  }

  /**
   * @param {Query} query
   * @return {Promise<any>}
   */
  handle(query) {
    throw new Error('must be implemented');
  }
}

module.exports = {QueryHandler};