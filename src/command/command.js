/**
 * @interface
*/
class Command {
  context = null;

  constructor(context = null) {
    if (new.target === this) {
      throw new Error('must be implemented');
    }

    this.context = context;
  }

  withContext(context) {
    this.context = context;

    return this;
  }
}

module.exports = {Command};
