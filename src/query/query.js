/**
 * @interface
 */
class Query {
  constructor() {
    if (new.target === this) {
      throw new Error('must be implemented');
    }
  }
}

module.exports = {Query};