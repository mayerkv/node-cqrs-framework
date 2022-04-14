/**
 * @interface
 */
class Command {
  constructor() {
    if (new.target === this) {
      throw new Error('must be implemented');
    }
  }
}

module.exports = {Command};