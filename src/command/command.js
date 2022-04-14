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
}

module.exports = {Command};