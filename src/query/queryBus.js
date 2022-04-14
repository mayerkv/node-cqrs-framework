/* eslint-disable no-unused-vars */

/**
 * @interface
 */
class QueryBus {
  constructor() {
    if (new.target === this) {
      throw new Error('must be implemented');
    }
  }

  /**
   * @param {Query} query
   * @return {Promise<any>}
   */
  dispatch(query) {
    throw new Error('must be implemented');
  }
}

module.exports = {QueryBus};