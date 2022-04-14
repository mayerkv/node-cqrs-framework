/* eslint-disable no-unused-vars */

/**
 * @interface
 */
class CommandHandler {
  constructor() {
    if (new.target === this) {
      throw new Error('must be implemented');
    }
  }

  /**
   * @param {Command} command
   * @return {Promise<CommandResponse>}
   */
  handle(command) {
    throw new Error('must be implemented');
  }
}

module.exports = {CommandHandler};