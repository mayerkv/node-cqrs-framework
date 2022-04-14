/* eslint-disable no-unused-vars */

/**
 * @interface
 */
class CommandBus {
  constructor() {
    if (new.target === this) {
      throw new Error('must be implemented');
    }
  }

  /**
   * @param {Command} command
   * @return {Promise<CommandResponse>}
   */
  dispatch(command) {
    throw new Error('must be implemented');
  }
}

module.exports = {CommandBus};