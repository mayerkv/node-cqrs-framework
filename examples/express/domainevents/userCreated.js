const {DomainEvent} = require('../../../src/domainevent/domainEvent');

class UserCreated extends DomainEvent {
  time = new Date();
  user;

  /**
   * @param {User} user
   */
  constructor(user) {
    super();
    this.user = user;
  }


  occurredOn() {
    return this.time;
  }
}

module.exports = {UserCreated};